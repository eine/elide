#!/bin/sh
# ./build-img-run.sh alpine tmpdir

rid=${1}-run
tag="run"
tmpdir=$2

cd $tmpdir
cp ../Dockerfile-$rid ./
docker build -t elide/$1:$tag -f Dockerfile-$rid .
cd ..