#!/bin/sh

#builds="alpine|x86_64|elide/alpine:dev fedora ubuntu"

cd docker
mkdir tmpinstall
./build-tools.sh "alpine|x86_64|elide/alpine:dev"

cd tmpinstall
for d in *.tar; do
  mkdir tmpext
  mv $d tmpext/
  cd tmpext
  tar -xvf $d
  for $f in *.tar.gz; do mv $f "${d%.*}-$f"; done;
  mv *.tar.gz ../
  cd ..
  rm -rf tmpext
done;

cd .. && mv docker/tmpinstall ./release