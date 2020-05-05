#!/bin/sh
# ./build-img-dev.sh alpine

rid=${1}-dev
tag="dev"

mkdir tmp-$rid && cd tmp-$rid
cp ../Dockerfile-$rid ./
read -r image<Dockerfile-$rid
docker pull $(echo $image | cut -c6-)
docker build -t elide/$1:$tag -f Dockerfile-$rid .
cd ..
rm -rf tmp-$rid