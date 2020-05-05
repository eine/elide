package main

import (
  flag "github.com/ogier/pflag"
  "fmt"
  "net/http"
  "net/http/httputil"
  "os"
  "path/filepath"
  "io/ioutil"
  "encoding/json"
)

//> Args
var port = flag.IntP("port", "p", 80, "port to serve at")
var dir = flag.StringP("dir", "d", "./", "dir to serve from")
var verb = flag.BoolP("verbose", "v", false, "")
//<

//> Global vars
var httpReqDump func(r *http.Request) = func(r *http.Request){}
//<

func init() {
  flag.Parse();
  if *verb { httpReqDump = httputilReqDump }
}

//> Show desired files only, not dirs
type justFilesFilesystem struct { fs http.FileSystem; }
type neuteredReaddirFile struct { http.File }

func (fs justFilesFilesystem) Open(name string) (http.File, error) {
  f, err := fs.fs.Open(name)
  if err != nil { return nil, err; }
  return neuteredReaddirFile{f}, nil
}

func (f neuteredReaddirFile) Readdir(count int) ([]os.FileInfo, error) { return nil, nil; }
//<

//> Print requests to stdout
func httputilReqDump (r *http.Request) {
  requestDump, err := httputil.DumpRequest(r, true)
  if err != nil { fmt.Println(err); }
  fmt.Println(string(requestDump))
}

func loggingHandler(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	  httpReqDump(r)
		h.ServeHTTP(w, r)
	})
}
//<

// AJAX Request Handler
func ajaxHandler(w http.ResponseWriter, r *http.Request) {
    data, err := ioutil.ReadAll(r.Body);
    if ((err != nil) || (string(data) != "Kaixo! ")) {
        str := "Unknown message"; if (err != nil) { str = err.Error(); }
        http.Error(w, str, http.StatusInternalServerError)
        return
    }

    res2D := &Response2{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res2B, _ := json.Marshal(res2D)
    fmt.Println(string(res2B))
    w.Write(res2B)

}

type Response2 struct {
    Page   int      `json:"page"`
    Fruits []string `json:"fruits"`
}

func main() {
  str, err := filepath.Abs(*dir)
  if err != nil { os.Exit(1); }
  fmt.Printf("Serving at port %d from dir %s\n\n",*port,str)

  http.Handle("/", loggingHandler(http.FileServer(justFilesFilesystem{http.Dir(*dir)})))
  http.HandleFunc("/ajax", ajaxHandler)
  http.ListenAndServe(fmt.Sprintf(":%d",*port), nil)
}


//https://github.com/mjibson/esc
//https://github.com/ET-CS/golang-response-examples

//https://golang.org/doc/articles/wiki/
//"As you may have observed, this program has a serious security flaw: a user can supply an arbitrary path to be read/written on the server. To mitigate this, we can write a function to validate the title with a regular expression."
