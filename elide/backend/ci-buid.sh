# Run in a docker container based on `golang:alpine`, to cross-compile `backend` to all the platforms.

set -ev

platforms="darwin;386 darwin;amd64 freebsd;386 freebsd;amd64 freebsd;arm linux;386 linux;amd64 linux;arm windows;386 windows;amd64"

#cd /go
export GOPATH=$(pwd)
export GOROOT_BOOTSTRAP=/goraw
go get github.com/ogier/pflag
cd src/github.com/1138-4EB/go/simpleserver

for platform in ${platforms}
do
    goos=`echo $platform | cut -d \; -f 1`
    goarch=`echo $platform | cut -d \; -f 2`

    output="$goos-$goarch"
    [[ "windows" == "$goos" ]] && output="$output.exe"

    echo "GOOS=$goos GOARCH=$goarch go build -x -o $destination $target"
    GOOS=$goos GOARCH=$goarch go build -o builds/$output
done

ls -la builds