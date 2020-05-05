# How to get docker

[Docker](https://www.docker.com) is available through the repositories of any of the main GNU/Linux distributions: [Debian](https://www.debian.org/), [Ubuntu](https://www.ubuntu.com/), [Fedora](https://getfedora.org/), [CentOS](https://www.centos.org/), [Arch Linux](https://www.archlinux.org/),... Most of VPS providers also support specific images optimized to run docker containers. Therefore, just follow the usual method to install packages.

Note: Docker recently split it's products into 'Community Edition' (CE) and 'Enterprise Edition' (EE), the difference being support and private hosting & automation services. Therefore, the package in the repositories might be named `docker-ce`.

- Debian [[1](https://docs.docker.com/engine/installation/linux/debian/)][[2](https://wiki.debian.org/Docker)]: `apt-get install docker.io`
- Ubuntu [[1](https://docs.docker.com/engine/installation/linux/ubuntu/)]: `apt-get install docker-ce`
- Fedora [[1](https://docs.docker.com/engine/installation/linux/fedora/)][[2](https://fedoraproject.org/wiki/Docker)]: `sudo dnf install docker-ce`
- CentOS [[1](https://docs.docker.com/engine/installation/linux/centos/)][[2](https://wiki.centos.org/Cloud/Docker)]: `sudo yum install docker`
- Arch [[1](https://wiki.archlinux.org/index.php/Docker)]: `sudo pacman -S docker`
- Alpine Linux [[1](https://wiki.alpinelinux.org/wiki/Docker)]: `apk add docker`

Just after installing docker and enabling the service, you will need to run evey docker command with sudo. To avoid so, just create a group as explained at [docs.docker.com: linux-postinstall](https://docs.docker.com/engine/installation/linux/linux-postinstall/)

On top of that, [travis-ci](https://travis-ci.org/), which is widely used in GitHub projects, provides [guidelines in the docs](https://docs.travis-ci.com/user/docker/) about how to use docker containers. Then, the images provided here can be used for Continous Integration of HDL projects with (almost all) free software tools.

Docker is also available for [macOS](https://docs.docker.com/docker-for-mac/) and [Windows](https://docs.docker.com/docker-for-windows/). However, support in these platforms is not as good as in GNU/Linux. Except Windows 10 versions with HyperVisor, any other runs docker inside a Virtual Machine (VM). More precisely, a [VirtualBox](https://docs.docker.com/machine/drivers/virtualbox/) machine. Therefore, there is notable performance loss. However, both in GNU/Linux and in latest Windows 10 version performance is equivalent to any other application running on the host.

Note: [hub.docker.com](https://hub.docker.com/) provides free hosting and automated builds for open projects.

# Available tags at docker-hub

The following table shows which tools are preinstalled in each of the ready-to-use images available at repository [hub.docker.com/r/elide](https://hub.docker.com/r/elide/). Terms 'shared', 'native' and 'static' mean the method used to either build or install each of the tools. See further details below.
 
| Tag | Base image | icestorm | arachne-pnr | yosys | iverilog | graphviz | xdot | gtkwave | python3 | python2 |
|---|---|---|---|---|---|---|---|---|---|---|
| [alpine-run](https://github.com/1138-4EB/elide/blob/master/docker/Dockerfile-alpine-run) | [python:3.6.1-alpine](https://github.com/docker-library/python/blob/32e920eb13714a9aeff2e016fb467901222d17b5/3.6/alpine/Dockerfile) *1 | shared | shared | shared | shared | native | native | shared | [python361-alpinelatest](https://github.com/1138-4EB/elide/blob/master/docker/Dockerfile-python361-alpinelatest) | - |
| [fedora-run](https://github.com/1138-4EB/elide/blob/master/docker/Dockerfile-fedora-run) | [fedora:25](https://github.com/fedora-cloud/docker-brew-fedora/blob/e69ce1c6d08c12153639648878aa6f7a04ceb00c/Dockerfile) | shared | shared | shared | native | native | native | - | ? | ? |
| [debian-run](https://github.com/1138-4EB/elide/blob/master/docker/Dockerfile-debian-run) | [debian:stretch-slim](https://github.com/tianon/docker-brew-debian/blob/84acea02caa27a742d423069251ee269d1a39e2a/stretch/slim/Dockerfile) | shared | shared | shared | native | native | native | - | ? | ? |
| [debian-apiodeb](https://github.com/1138-4EB/elide/blob/master/docker/Dockerfile-debian-apiodeb) *2 | [debian:stable-slim](https://github.com/tianon/docker-brew-debian/blob/e8131d071a42b8e88cabbb0aa33023c7b66b7b93/stable/slim/Dockerfile) | native | native | native | native | ? | ? | - | ? | native |
| [ubuntu-apio](https://github.com/1138-4EB/elide/blob/master/docker/Dockerfile-ubuntu-apio) *2 | [ubuntu:16.04](https://github.com/tianon/docker-brew-ubuntu-core/blob/1a5cb40f41ac4829d8c301ccd2cf3b7a13687a8b/xenial/Dockerfile) | static | static | static | static | ? | ? | - | ? | native |

- *1: a equivalent image is used, but adapted to [alpine:3.5](https://github.com/gliderlabs/docker-alpine/blob/c7368b846ee805b286d9034a39e0bbf40bc079b3/versions/library-3.5/Dockerfile). See [python361-alpinelatest](https://github.com/1138-4EB/elide/blob/master/docker/Dockerfile-python361-alpinelatest).
- *2: there is an [issue](https://github.com/FPGAwars/apio/issues/127) with enabling the drivers with *apio*, so this feature is disabled.

---

- **native** installs are those performed with the default package manager in each of the distributions, and binaries are usually prebuilt with shared libraries. These are first looked for in the main repostories. If any of them is not found, testing branches are checked. Last, user repositories, such as [AUR](https://aur.archlinux.org/) are used.
- **shared** installs are built from sources (git/mercurial repositories are *cloned*) with shared libraries, so that dynamically linked binaries are generated. A diferent set of docker images is used for building, see *Build docker images* below.
- **static** installs use prebilt binaries which include any required libraries, thus, are statically linked.

As a rule of thumb, native installs are preferred, since these are usually seamless and optimal for the chosen platform. However, when this is not available, builds with shared libraries are recommended:

> https://en.wikipedia.org/wiki/Static_build
>
> Dynamic linking offers three advantages:
>  - Often-used libraries (for example the standard system libraries) need to be stored in only one location, not duplicated in every single binary.
>  - If a library is upgraded or replaced, all programs using it dynamically will immediately benefit from the corrections. Static builds would have to be re-linked first.
>  - The binary executable file size is smaller than its statically linked counterpart.
>
> On the other hand, static builds have a very predictable behavior (because they do not rely on the particular version of libraries available on the final system).

Because of this last feature, images with statically built binaries are offered as a workaround to be used when neither of the previous solutions work. Actually, images for architectures different from *x86_64* are not available, so [apio](https://github.com/FPGAwars/apio) is used.

# Build docker images

- Notes:
    - These scripts must be run from subdir `docker`.
    - Although all the steps in the process are explained, each of them can be executed on its own.

---

Build a new image from the base of the chosen distribution (`fedora`, `debian` or `alpine`) and install all the dependencies required to later build any or all of the tools:

```
./build-img-dev.sh alpine
```

These are tagged as `elide/alpine:dev`. So, alternatively, you can pull the version available online: `docker pull elide/alpine:dev`.

---

- Launch a container based on the corresponding `*-dev` image.
- Inside the container, download the latest sources of the tools and build each of them.
- Pack each tool in a `tar.gz` and all of these in a `tar`, which is saved to `tmpinstall`. This folder must exist before calling the script:

```
mkdir tmpinstall
./build-tools.sh "alpine|arch|elide/alpine:dev"
```

Indeed, these are the binaries that are made avaiable at [Releases](https://github.com/1138-4EB/elide/releases).

See in the table above which tools are built in each platform.

By default icestorm + arachne-pnr + yosys + iverilog + graphviz are built, and in alpine only,  GtkWave. Modify `build-run-dockerfile.sh`, `build-icestorm-arachnepnr-yosys.sh` and/or `build-iverilog-gtkwave.sh` to add/remove tools.

---

- Create a temporal directory, and a subdir named `tmpinstall`.
- Either place the `tar` from the previous step or extract it's content to `tmpinstall`. Optionally add any additional content.
- Copy the initialization script to the same directory.
    - This script can be modified here or at runtime, because it is not executed when built.
- Build a new image from the base of the chosen distribution (which should match `FROM` in `Dockerfile-*-dev`), install minimum runtime dependencies, and copy `tmpinstall/*` from the host to `/elide/` in the image.

```
mkdir -p tmp-alpine-run/tmpinstall
tar -xvf tmpinstall/alpine-*.tar -C tmp-alpine-run/tmpinstall/
cp elide-init.sh tmp-alpine-run/tmpinstall/init.sh

./build-img-run.sh alpine tmp-alpine-run
```

---

Clean temporal directories:

```
rm -rf tmp-alpine-run
rm -rf tmpinstall
```

# Contributing

Two different images are created for each distribution, so that compilation dependencies are kept apart from runtime dependencies. Carefully choose which packages to add to `*-run` images, since these are expected to be compact. That is, do not install packages such as git, which, even though is very common, is not a dependency. Shall a user require it, it can be installed with the package manager. Furthermore, local images which include user-specific requirements can be built on top of these.

There is not such a recommendation with `*-dev`, because these are expected to be used for development only.

## Roadmap

- At now images are only available for `x86_64`. However, ARM is supported by docker, so that it can be run on Single Board Computers (SBCs), such as Raspberry Pi or Orange Pi. To allow so, binaries must be cross-compiled. A possible approach is to run QEMU inside containers on `x86_64`. This allows to execute native tools inside, instead of actually setting a cross-compilation toolchain.
- `*-run` images can be used to build LiveCD images. More precisely, minimum runtime dependencies are specified and prebuilt binaries are copied.
- Dockerfiles install the driver for FTDI devices and a rule for `udev` inside `*-run` images. However, this should also be applied to the host. Since, the container itself should not modify the host, a check should be run prior to the execution of prog command, so that a message is shown to tell the user about pending steps.
