#!/bin/sh
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="pages"
TARGET_BRANCH="master"

function doCompile {
  git clone "${REPO%.*}.wiki.git" content/wiki
  cd content/wiki
  rm -rf wip .git
  mv _Sidebar.md Menu.md

  for f in *.md; do
    sed -i -r 's/\[\[(.*)\|(.*)\]\]/[\1]({{< relref "wiki\/\2.md" >}})/g' ./*.md
    name="$(echo "$f" | sed 's/-/ /g')"
    printf -- "---\ntitle: \"%s\"\ndescription: \"%s\"\ndate: \"%s\"\nlastmod: \"%s\"\n---\n$(cat $f)" "${name%.*}" "${f%.*}" $(git log -1 --format="%ai" -- "$f" | cut -c1-10) $(date +%Y-%m-%d -r "$f") > $f
  done;

  cd ../..

  git clone https://github.com/halogenica/beautifulhugo.git ./themes/beautifulhugo

  sed -i -r 's/\"\{\{\$img\.src \| absURL \}\}\"/"{{$.Site.BaseURL}}{{$img.src}}"/g' ./themes/beautifulhugo/layouts/partials/header.html
  patch -p0 < themes/beautifulhugo.patch

  wget https://github.com/spf13/hugo/releases/download/v0.19/hugo_0.19_Linux-64bit.tar.gz
  tar zxvf hugo_0.19_Linux-64bit.tar.gz
  mv hugo_0.19_linux_amd64/hugo_0.19_linux_amd64 ./hugo_bin
  rm -rf hugo_0.19_*

  mv out/README.md backread.md

  # Clean out existing contents
  rm -rf out/**/* || exit 0

  export GIT_COMMIT_SHA=`git rev-parse --verify HEAD`
  export GIT_COMMIT_SHA_SHORT=`git rev-parse --short HEAD`
  ./hugo_bin -FED -d out
  rm -rf hugo_bin

  mv backread.md out/README.md
}

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
  echo "Skipping pages deploy."
  doCompile
  exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing TARGET_BRANCH for this repo into out/
# Create a new empty branch if TARGET_BRANCH doesn't exist yet (should only happen on first deply)
git clone $REPO out && cd out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Run our compile script
doCompile

# Now let's go have some fun with the cloned repo
cd out
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

git add .

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if [ $(git status --porcelain | wc -l) -lt 1 ]; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git commit -am "Deploy to GitHub Pages: ${SHA}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
eval `ssh-agent -s`
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ../deploy_key.enc -d | ssh-add -

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH