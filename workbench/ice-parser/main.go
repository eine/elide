/*
  export GOPATH=$(pwd)
*/

package main

import (
    //"encoding/xml"   //https://golang.org/pkg/encoding/xml/
    "encoding/json"
    "fmt"            //https://golang.org/pkg/encoding/fmt/
    "os"
    "io/ioutil"
    "time"
    //"os/user"        //https://golang.org/pkg/os/user/
    //"crypto/md5"     //https://golang.org/pkg/crypto/md5
)

//> Structures to read the configuration file of Syncthing (v12)

type ICE_coord struct {
  X int `json:x`
  Y int `json:y`
}

type ICE_block struct {
  ID string   `json:id`
  Data interface{} `json:data`
  Type string `json:type`
  Position ICE_coord `json:position`
}

type ICE_node struct {
  Block string `json:block`
  Port  string `json:port`
}

type ICE_wire struct {
  Source ICE_node `json:source`
  Target ICE_node `json:target`
  Vertices []ICE_coord `json:vertices`
}

type ICE_package struct {
  Name        string `json:name`
  Version     string `json:version`
  Description string `json:description`
  Author      string `json:author`
  Image       string `json:image`
}

type ICE_design struct {
  Board string `json:board`
  Graph struct {
          Blocks []ICE_block `json:blocks`
          Wires  []ICE_wire  `json:wires`
        } `json:graph`
  State struct {
          Pan ICE_coord `json:pan`
          Zoom float32 `json:zoom`
        } `json:state`
}

type ICE_default struct {
  Version      string         `json:version`
  Package      ICE_package    `json:package`
  Design       ICE_design     `json:design`
  Dependencies interface{}    `json:dependencies`
}

func Read (v interface{}, file string) error {
    // Read config.xml
	File, err := os.Open(file)
	if err != nil {
	  fmt.Printf("error opening file: %v\n", err)
	  return err
	}
	defer File.Close()
	b, err := ioutil.ReadAll(File)
	if err != nil {
	  fmt.Printf("error reading file: %v\n", err)
	  return err
	}
    // Extract data (unmarshal) to fill the structure
	err = json.Unmarshal(b, v)
	if err != nil {
	  fmt.Printf("error extracting %s to struct: %v\n", file, err)
	  return err
	}
	return err
}

func main() {

  start := time.Now()

  var def ICE_default
  Read(&def,"complex.json")

  fmt.Println("version:\t",def.Version)
  fmt.Println("pkg-name\t",def.Package.Name)
  fmt.Println("pkg-version\t",def.Package.Version)
  fmt.Println("pkg-description\t",def.Package.Description)
  fmt.Println("pkg-author\t",def.Package.Author)
  fmt.Println("pkg-image\t",def.Package.Image)

  //fmt.Println(def.Design.Board)
  //fmt.Println(def.Design.Graph)

  fmt.Println("\nBLOCKS\n")

  for _, b := range def.Design.Graph.Blocks {
    fmt.Println("> ID:\t",b.ID)
    fmt.Println(" type:\t",b.Type)
    fmt.Println(" pos:\t",b.Position)
    fmt.Println(" data:\t",b.Data)
  }

  fmt.Println("\nWIRES\n")

  for _, w := range def.Design.Graph.Wires {
    fmt.Println(">",w.Source)
    fmt.Println(" ",w.Target)
    fmt.Println(" ",w.Vertices)
  }

  fmt.Println(def.Design.State.Pan)
  fmt.Println(def.Design.State.Zoom)

  //fmt.Println(def.Dependencies)

  elapsed := time.Since(start)
  fmt.Printf("...took %s", elapsed)
}
