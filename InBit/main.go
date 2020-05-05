package main

import (
	"fmt"
	"github.com/gorilla/mux"
	flag "github.com/ogier/pflag"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httputil"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	//"github.com/mikepb/go-serial"
)

//> Args
var port = flag.IntP("port", "p", 80, "port to serve at")
var dir = flag.StringP("dir", "d", "./public", "dir to serve from")
var verb = flag.BoolP("verbose", "v", false, "")
//<

//> Global vars
var httpReqDump func(r *http.Request) = func(r *http.Request) {}

func init() {
	flag.Parse()
	if *verb {
		httpReqDump = httputilReqDump
	}
}
//<

//> Show desired files only, not dirs
type justFilesFilesystem struct{ fs http.FileSystem }
type neuteredReaddirFile struct{ http.File }

func (fs justFilesFilesystem) Open(name string) (http.File, error) {
	f, err := fs.fs.Open(name)
	if err != nil {
		return nil, err
	}
	return neuteredReaddirFile{f}, nil
}

func (f neuteredReaddirFile) Readdir(count int) ([]os.FileInfo, error) { return nil, nil }
//<

//> Print requests to stdout
func httputilReqDump(r *http.Request) {
	requestDump, err := httputil.DumpRequest(r, true)
	if err != nil {
		log.Println(err)
	}
	log.Println(string(requestDump))
}

func loggingHandler(h http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		httpReqDump(r)
		h.ServeHTTP(rw, r)
	})
}
//<

func main() {
	log.Println("[InBit backend] Start")

	str, err := filepath.Abs(*dir)
	if err != nil {
		os.Exit(1)
	}
	log.Printf("Serving at port %d from dir %s\n", *port, str)

	r := mux.NewRouter()
	r.HandleFunc("/ajax{rest:.*}", AJAXHandler)
	r.PathPrefix("/").Handler(loggingHandler(http.FileServer(justFilesFilesystem{http.Dir(*dir)})))

	http.ListenAndServe(fmt.Sprintf(":%d", *port), r)
}

func AJAXHandler(w http.ResponseWriter, r *http.Request) {
	httpReqDump(r)
	rest := mux.Vars(r)["rest"]
	switch {
	case strings.HasPrefix(rest, "/setDTR/"):
		data, err := ioutil.ReadAll(r.Body)
		if err == nil {
			b, err := strconv.ParseBool(string(data))
			log.Println("setDTR request:", b)
			if err == nil {
				setDTR(b)
				w.Write([]byte(data))
				return
			}
			w.Write([]byte("ERROR"))
		}
	default:
		http.Error(w, "Unknown Status", http.StatusInternalServerError)
	}
}

func setDTR(v bool) (int, error) {
	log.Println("setDTR:", v)
	/*
	  options := serial.RawOptions
	  options.BitRate = 115200

	  // Replace /dev/ttyUSB1 with you serial port name
	  p, err := options.Open("/dev/ttyUSB1")
	  if err != nil { log.Panic(err) }
	  defer p.Close()

	  err = p.SetRTS(false);
	  if err != nil { log.Panic(err) }

	  err = p.SetDTR(v);
	  if err != nil { log.Panic(err) }

	  return p.DTR();
	*/
	return 0, nil
}
