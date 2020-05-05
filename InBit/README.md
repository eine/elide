# InBit - golang

A hello world golang backend to set the DTR signal of a serial port from a Vue.js + Tachyons + Font-awesome frontend.

Golang is used as an alternative to node.js/Electron, in order to reduce the size of released binaries and to allow a client-server approach.

# How does it work?

- When the button in the frontend is switched:
  - A message is shown in the browser console.
  - An AJAX POST request is sent to the backend.
- When the backend receives the request:
  - A message is shown in the log.
  - setDTR is executed.
- When setDTR returns:
  - Return data is shown in the log.
  - The backend responds to the request.
- When the frontend receives the response, a message is shown in the browser console.

# Quick start

Install golang, or install docker, or use [play-with-docker](play-with-docker.com) (PWD).

## golang

- Set GOPATH, get the repo and run the backend:

```
mkdir work && cd work
export GOPATH=$(pwd)
go get github.com/1138-4EB/InBit
./bin/InBit -d src/github.com/1138-4EB/InBit/public [-v] [-p <port_number>]
```

In order to distribute the app, both the binary file and the public dir must be packed.

## docker

- Start a golang container, get the repo and run the backend:

```
docker run --rm -itp 80:80 golang sh -c " \
go get github.com/1138-4EB/InBit \
cd src/github.com/1138-4EB/InBit \
go run main.go [-v] [-p <port_number>]"
```

## play-with-docker

- Create a new node.
- Optionally, run hacdias/filemanager (a web file manager) to use it as a simple IDE:

```
docker run --rm -dv $(pwd):/srv -p 8000:80 hacdias/filemanager --no-auth -s /srv -p 80
```

- Start a golang container, get the repo and run the backend:

```
docker run --rm -itp 80:80 [-v $(pwd):/go] golang sh \
go get github.com/1138-4EB/InBit \
cd src/github.com/1138-4EB/InBit \
go run main.go [-v] [-p <port_number>]
```

# Demo

![pwd_inbit_golang_edit](https://github.com/1138-4EB/InBit/raw/master/img/pwd_inbit_golang_edit.gif)

# ToDo

- Debug serial port connection and behavior.

# References

- AJAX:
  - https://blog.garstasio.com/you-dont-need-jquery/ajax/
  - https://dev.to/gcdcoder/how-to-upload-files-with-golang-and-ajax
  - https://www.reddit.com/r/golang/comments/2tmllh/sending_an_ajax_request_to_go_web_server/
- Serial
  - https://godoc.org/github.com/mikepb/go-serial
  - https://github.com/pkg/term
  - https://github.com/edartuz/go-serial
  - https://godoc.org/github.com/facchinm/go-serial
  - https://godoc.org/go.bug.st/serial.v1
