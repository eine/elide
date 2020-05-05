package main

import (
  "fmt"
  "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "Hello world!")
}

func main() {
  http.Handle("/", http.FileServer(http.Dir("./")))
  http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css/"))))
  http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js/"))))
  //http.HandleFunc("/", handler)
  http.ListenAndServe(":3000", nil)
}

/*
package main

import (
        "net/http"
)

func main() {
//http.Handle("/js", http.FileServer(http.Dir("./js")))
//http.Handle("/css", http.FileServer(http.Dir("./css")))
http.ListenAndServe(":3000", nil)
}
*/
