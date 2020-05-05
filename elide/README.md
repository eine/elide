- `backend`: lightweight standalone webserver, written in go. It takes two (optional) arguments: the port to serve at, and the folder to serve from.
- `frontend`: mxgraph-based diagraman editor and related documentation site.
- `mxgraph`: forks of subdir 'javascript/examples' and subdir 'docs' at [jgraph/mxgraph](https://github.com/jgraph/mxgraph) (except `php-api`).
- `workbench`: work in progress... see [workbench/README](workbench/README.md).
- `docker`: multiple Dockerfiles to automate the building and distribution of the toolchain. To know how these are built, see [docker/README](docker/README.md). To use the images, see *Run free tools (...) in a docker container* below.
- `travis`: dist/build scripts.
- `.travis.yml`: configuration file for travis-ci. See [travis/README](travis/README.md).

# How to build `backend` and serve `frontend`

Install [golang](https://golang.org/) and execute:

``` bash
mkdir work
cd work
git clone --depth=1 https://github.com/1138-4EB/elide
cd elide/backend
export GOPATH=$(pwd)
go get -d ./...
go build
./backend -p 80 -d ../frontend
```

Now, you can browse `localhost`.

# portainer.io: the easiest way to manage Docker

``` bash
docker run -d --name portainer -p 9000:9000 -v "/var/run/docker.sock:/var/run/docker.sock" portainer/portainer
```

# Run free tools for HDL sim, synth, impl and report in a docker container

In order to avoid installing multiple dependencies in the user's system, prebuilt docker images are provided. These include the following tools:

[icestorm](http://www.clifford.at/icestorm/), [arachne-pnr](https://github.com/cseed/arachne-pnr), [yosys](http://www.clifford.at/yosys/), [iverilog](http://iverilog.icarus.com/), [graphviz](http://www.graphviz.org/), [GtkWave](http://gtkwave.sourceforge.net/) and/or [GHDL](https://github.com/tgingold/ghdl)

Note: the only requirement is a host with docker installed. To check how to do so, along with details about available base images and tool sets, see [docker/README](docker/README.md).

---

To run any sequence of commands, just write a script and launch the desired container. For example, this shows the version of yosys and arachne-pnr, and the path where icebram is installed:

``` bash
$ echo "sh -l; yosys -V && arachne-pnr -v && which icebram" > myscript.sh

$ docker run --rm elide/alpine:run sh -c "$(cat myscript.sh)"

Yosys 0.7+161 (git sha1 58ee8e3b, clang 3.8.1 -fPIC -Os)
arachne-pnr 0.1+190+0 (git sha1 e7acac1, g++ 6.2.1 -O2)
/usr/local/bin/icebram
```

---

To allow seamless usage of user sources, the directory from where the container is launched (or any other in the host) can be shared:

``` bash
$ docker run --rm \
>  -v $(pwd):/work:z \
>  elide/alpine:run sh -c "$(cat myscript.sh)"
```

---

On top of that, instead of running a script, commands can be interactively introduced inside the container:

``` bash
$ docker run --rm \
>  -it \
>  -v $(pwd):/work:z \
>  elide/alpine:run

/work # 
```

---

Finally, in order to run GtkWave, mounting the X11 socket is required:

``` bash
docker run --rm -it \
>  -v /tmp/.X11-unix/:/tmp/.X11-unix \
>  -e DISPLAY=unix$DISPLAY \
>  elide/alpine:run

/work # gtkwave
```

Note: the first time gtkwave is launched, icons might not load properly (see [gtkicons](workbench/png/gtkicons.gif)). Just close and launch again.

See more examples about running GUI applications in docker at [blog.jessfraz.com/post/docker-containers-on-the-desktop](https://blog.jessfraz.com/post/docker-containers-on-the-desktop/) ([jessfraz/dockerfiles](https://github.com/jessfraz/dockerfiles)).

## Compressed distribution

In order to save space, the non-native dynamically built binaries are included in the images in `tar.gz` format at `/elide`. This allows to load only the required tools by selectively unpacking them.

A initialization script located at `/etc/profile.d/elide_init.sh`. Therefore, each time a login shell is launched, the script checks if the tools are unpacked yet. If not, which means that this is the first launch, all of them are extracted.

This is the default behaviour when a container is launched wihout any command argument, or with `sh -l`. However, if every command in the container is executed with `sh` or `sh -c`, the initialization script is never triggered. This can be desirable in some situations. Nevertheless, any of the optiones below, which need to be run only once in the life of a container, will unpack the tools:

- Prepending `sh -l;` to any script launched with `sh -c`.
- Executing `/elide/init.sh` or `/etc/profile.d/elide_init.sh`
- Manually extracting the `tar` and/or `tar.gz` files.

## Keeping a container in the background

Decompression is quite fast, but it can be a notable performance penalty to do it every time a non-interactive command is required to be executed. A workaround is to launch a single container and detach from it, so that it is left running in the background:

- Start a container: `docker run --name elide -dit elide/alpine:run`
    - With a given name, e.g. `elide`.
    - [Optional] Add these arguments to support GUI applications: `-v /tmp/.X11-unix/:/tmp/.X11-unix -e DISPLAY=unix$DISPLAY`
    - [Optional] Share a folder with the host: `-v $(pwd):/work:z` (see (https://docs.docker.com/engine/tutorials/dockervolumes/#mount-a-host-directory-as-a-data-volume)

- Now any command can be executed with: `docker exec -it elide /bin/sh -c gtkwave`

- You can also attach to it again: `docker attach elide`. Detach with the defined key sequence: `Ctrl-p Ctrl-q` [docs.docker.com/engine/reference/commandline/attach](https://docs.docker.com/engine/reference/commandline/attach/#extended-description), or exit to stop the container.

Note that `--rm` was not used when run for the first time, so that the container can be used even after reboot.
