package rwXML

import (
	"encoding/xml"   //https://golang.org/pkg/encoding/xml/
	"fmt"            //https://golang.org/pkg/encoding/fmt/
	"io/ioutil"      //https://golang.org/pkg/io/ioutil/
	"os"             //https://golang.org/pkg/os/
)

// Read takes an XML file and unmarshals it to an struct
func Read (v interface{}, file string) error {
    // Read config.xml
	xmlFile, err := os.Open(file)
	if err != nil {
	  fmt.Printf("error opening file: %v\n", err)
	  return err
	}
	defer xmlFile.Close()
	b, err := ioutil.ReadAll(xmlFile)
	if err != nil {
	  fmt.Printf("error reading file: %v\n", err)
	  return err
	}	
    // Extract data (unmarshal) to fill the structure
	err = xml.Unmarshal(b, v)
	if err != nil {
	  fmt.Printf("error extracting XML to struct: %v\n", err)
	  return err
	}
	return err
}

// Write marshals an struct and saves it to an XML file
func Write (v interface{}, file string) error {
    // Open file to write output
	xmlOut, err := os.Create(file)
	if err != nil {
	  fmt.Printf("error creating file: %v\n", err)
	  return err
	}	
	defer xmlOut.Close()
    // Convert structure to XML
	output, err := xml.MarshalIndent(v, "", "    ")
    if err != nil {
	  fmt.Printf("error converting structure to XML: %v\n", err)
	  return err
    }
    // Write file
    _ , err = xmlOut.Write(output)
	if err != nil {
	  fmt.Printf("error: %v\n", err)
	  return err
    }
    //os.Stdout.Write(output)
	return err
}