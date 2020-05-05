- http://mattjibson.com/blog/2014/11/19/esc-embedding-static-assets/
- https://github.com/robertkrimen/otto
- https://github.com/gopherjs/gopherjs
- http://stackoverflow.com/questions/29282231/go-json-decoding-is-very-slow-what-would-be-a-better-way-to-do-it

---

- http://jgraph.github.io/mxgraph/
- https://github.com/tuxin-skeleton
- https://github.com/JohnDRO/Golirev-IDE
- https://speakerdeck.com/wallento/the-state-of-open-source-processors-and-open-source-silicon
- https://github.com/olofk/fusesoc
- https://nathanleclaire.com/blog/2013/11/30/fear-and-loathing-with-golang-and-angular-js/
- https://github.com/bq

---

# mxgraph examples

- Graph Editor: the references
  - Modifications:
    - Allow a user configuration file to:
	   - Disable 'Page view' and 'Grid' by default, to get and 'infinite', plain canvas.
	   - Hide scrollbars.
	- Add 'Pages view', not only a single one.
	- Side menus:
	   - Allow to hide (not only close) any, or both.
	   - Allow to handle them as windows (just as 'Outline' and 'Layers').
	- Allow 'Outline' and 'Layers' to be snapped to a side menu.
	- Move main menu (File, Edit, View...) to right-click menu.
    - Add 'Navigation -> Enter Group' to right-click menu, when a group is selected.
	  - Add 'Navigation -> Exit Group' to right-click menu, when inside a group.
	- Add 'Collapse' and 'Expand' to right-click menu, when applicable.
	- Add 'split-screen' support, to explore multiple parts of the same circuit (open different groups).
	- Add ports to groups.
	- Make all groups 'Collapsible' by default, add line, and show port names, at least.
	- Block edition of elements in a group if not in it. That's it, do not allow 'ungroup'.
	- If a block inside a group is connectec to an external one, a port must be added to the group.
	
- mxDraw:
  - Interesting features:
    - Containers are 'named groups'. A similar approach can be used to show 'entities'. Changing the 'architecture' would be replacing the content, except ports.
	
# Controls

- Pan
  - wheelbutton
- Zoom
  - Ctrl + '+'|'-'
  - Ctrl + mousewheel
  - Alt + mousewheel  

- vhost, replace localhost with a meaningful local domain: `elide.app`?

# Deploy `elide/hugo` to `elide/frontend/doc`

```
cd elide/hugo/themes
curl -L http://github.com/1138-4EB/beautifulhugo/archive/master.tar.gz | tar xz
mv beautifulhugo-master beautifulhugo
cd ../..
mkdir tmpHugo
cd tmpHugo
wget https://github.com/spf13/hugo/releases/download/v0.19/hugo_0.19_Windows-64bit.zip 
unzip hugo_0.19_Windows-64bit.zip
cd ../hugo
../tmpHugo/hugo_0.19_windows_amd64.exe -t beautifulhugo -D -d ../frontend/doc/
````

# Make `elide.app` an alias of `localhost`

Add `127.0.0.1	elide.app` to `/etc/hosts` (GNU/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows). 

#

`id -u greys`

---

https://github.com/brosnanyuen/Project-Popsicle-Stick
https://github.com/brosnanyuen/Project-Popsicle-Stick-V2
https://hackaday.io/project/7043-fleafpga-uno-starter-board

