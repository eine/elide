#!/bin/sh

printf "\n[ELIDE] Init...\n"

doextract=$(which icebram)
if [ "$doexract" != "" ]; then doextract=$(which arachne-pnr); fi;
if [ "$doexract" != "" ]; then doextract=$(which yosys); fi;
if [ "$doexract" != "" ]; then doextract=$(which iverilog); fi;
if [ "$doexract" != "" ]; then doextract=$(which gtkwave); fi;

if [ "$doextract" == "" ]; then
  mkdir /elide/ungzed/
  for f in /elide/*.tar.gz; do tar -zxvf $f -C /elide/ungzed/; done
  for f in $(find /elide/ungzed/ -name *.tar); do
    printf "\n[ELIDE] Unpacking %s...\n" $f
    tar -xvf $f -C /usr/local/;
  done
fi;

printf "\n[ELIDE] Init done!\n\n"

#tail -f /dev/null
