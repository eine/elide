#!/bin/sh
#./build-tool.sh "dist|arch|image:tag"

set -e

DIST=$(echo "$1" | awk '{split($1,a,"|"); print a[1]}')
ARCH=$(echo "$1" | awk '{split($1,a,"|"); print a[2]}')
DIMG=$(echo "$1" | awk '{split($1,a,"|"); print a[3]}')

TMPCONT="tmp-$DIST-$ARCH"
ELIDE_TAG="$DIST-$ARCH-$(git rev-parse HEAD | cut -c1-8)"

#./build-img-dev.sh ${1}
# or
docker pull "$DIMG"

mkdir "$TMPCONT" && cd "$TMPCONT"

repos="cliffordwolf/icestorm cseed/arachne-pnr cliffordwolf/yosys"
if [ $DIST = "alpine" ]; then repos="steveicarus/iverilog $repos gtkwave-code/gtkwave"; fi;

printf "set -e\nELIDE_TAG=$ELIDE_TAG\n\n" > cmds.sh
cat ../build-tools-aux.sh >> cmds.sh
for f in $repos; do printf "\nelide_build %s" $f >> cmds.sh; done;

if [ $(uname -a | grep -o "Msys") != "" ]; then
  winpty docker run --name $TMPCONT -itv /$(pwd):/elide:z -w /"/root" "$DIMG" sh -c ". /elide/cmds.sh && mv *.tar.gz /elide";
else
  docker run --name $TMPCONT -itv $(pwd):/elide:z -w "/root" "$DIMG" sh -c ". /elide/cmds.sh && mv *.tar.gz /elide"
fi;

docker rm "$TMPCONT"

tar -cvf "../tmpinstall/$ELIDE_TAG.tar" *.tar.gz
cd .. && rm -rf "$TMPCONT"
