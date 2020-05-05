FROM debian:sid

RUN dpkg --add-architecture armhf && apt-get update && apt-get install -y \
  build-essential \
  debootstrap \
  device-tree-compiler \
  g++-arm-linux-gnueabihf \
  git \
  u-boot-tools
