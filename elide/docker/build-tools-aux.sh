elide_readme() {
  ELIDE_README=~/package-$TOOL/README-elide-$TOOL

  printf 'These dynamically linked binaries are automatically built from the latest sources available at:\n\n%s\n\nPrebuilt binaries are distributed at https://github.com/1138-4EB/elide in the hope that they will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.\n\nFurthermore, since this is quite inmature work in progress, the authors of the tools are not aware. Then, it should not be considered to be endorsed by them. Of course, they will be notified as soon as this reaches a stable
state.\n\n------------------------------------------------------------------------------------------------------------------------\n\nINSTALL: tar -xvf %s.tar -C /usr/local/\n\n------------------------------------------------------------------------------------------------------------------------\n\nRaw copy of *README*:\n\n' "$REPO" "$TOOL" > $ELIDE_README

  cat $TOOL/README* >> $ELIDE_README

  if [ $HASCOPYING -ne 0 ]; then
    printf '\n\n------------------------------------------------------------------------------------------------------------------------\nRaw copy of *COPYING*:\n\n' >> $ELIDE_README
    cat $TOOL/COPYING* >> $ELIDE_README
  fi;
}

elide_build () {

  REPO="$1"
  TOOL=$(echo $1 | sed -e 's:.*\/\(.\):\1:g')

  mkdir $TOOL && cd $TOOL

  case $TOOL in
    "gtkwave")
      REPO=svn://svn.code.sf.net/p/gtkwave/code/gtkwave3
      svn checkout $REPO ./
      TOOL_SHORT=$(svn info | grep "UUID" | cut -c18-25)
    ;;
    *)
      REPO="https://github.com/$REPO.git"
      git clone $REPO ./
      TOOL_SHORT=$(git rev-parse HEAD | cut -c1-8)
    ;;
  esac

  case $TOOL in
    "gtkwave") ./configure --prefix=/usr/local --with-tk=/usr/lib ;;
    "iverilog") sh autoconf.sh && ./configure DESTDIR=$HOME/package-$TOOL ;;
    *) ;;
  esac

  make -j$(nproc) DESTDIR=$HOME/package-$TOOL

  case $TOOL in
    "iverilog" | "gtkwave") make check;;
    "yosys") make test;;
    *) ;;
  esac

  make install DESTDIR=$HOME/package-$TOOL
  make install
  cd $HOME

  case $TOOL in
    "icestorm" | "yosys" ) HASCOPYING=0 ;;
    *) HASCOPYING=1 ;;
  esac

  elide_readme

  cd $HOME/package-$TOOL/usr/local/
  tar -cvf $HOME/package-$TOOL/$TOOL.tar *
  cd $HOME && rm -rf $HOME/package-$TOOL/usr
  tar -zcvf $HOME/$ELIDE_TAG-$TOOL-$TOOL_SHORT.tar.gz package-$TOOL/*
  rm -rf $TOOL package-$TOOL
}
