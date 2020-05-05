cp -r /work/.abuild ~ 
cd ~
cp .abuild/58e0a76a.rsa.pub /etc/apk/keys/
echo "~/.cache/abuild/" >> /etc/apk/repositories

echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories
apk add -U alpine-sdk xorriso syslinux

git clone git://git.alpinelinux.org/alpine-iso
cp /work/alpine-elide.* alpine-iso/

apk update
cd alpine-iso
make PROFILE=alpine-elide iso
make PROFILE=alpine-elide sha1
mv alpine-elide*.iso /work/