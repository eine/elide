// Program starts here. Creates a sample graph in the DOM node with the specified ID.
// This function is invoked from the onLoad event handler of the document.

function include(src) { document.write('<script "type="text/javascript" src="'+src+'"></script>'); }

include('js/anns-ajax.js');
include('js/anns-popupmenu.js');
include('js/anns-wavedrom.js');

function anns(container) {
   if (!mxClient.isBrowserSupported()) { // Checks if the browser is supported
      mxUtils.error('Browser is not supported!', 200, false);
   } else {
      // Disables built-in context menu
      mxEvent.disableContextMenu(container);

      var graph = new mxGraph(container); // Creates the graph inside the given container
      var rubberband = new mxRubberband(graph); // Enables rubberband (marquee) selection and a handler
      var keyHandler = new mxKeyHandler(graph); // Enables basic keyboard events (eg. return, escape during editing)

      // Enables tooltips, new connections and panning
      graph.setPanning(true);
      graph.setTooltips(true);
      graph.setConnectable(true);

      // Do not snap to grid
      graph.setGridEnabled(false);

      graph.graphHandler.removeCellsFromParent = false;

      // Automatically handle parallel edges
      //var layout = new mxParallelEdgeLayout(graph);
      //var layoutMgr = new mxLayoutManager(graph);
      //layoutMgr.getLayout = function(cell) { if (cell.getChildCount() > 0) { return layout; } };

      graph.addListener(mxEvent.RESIZE_CELLS, function(sender, evt)
      {
        console.log(evt)
        console.log(evt.properties.cells[0].data.type)
        console.log(evt.properties.cells[0].id)
        console.log(evt.properties.cells[0].geometry.width)
        console.log(evt.properties.cells[0].geometry.height)
      });

      // Defines tooltips for Cells
      graph.getTooltipForCell = function(cell) {
         if (this.getModel().isEdge(cell)) {
            return 'W' + cell.data.id[0] + ' [' + cell.data.id.slice(1,3) + '] : ' + cell.data.val;
         } else {
            switch(cell.data.type) {
               case 'model': return cell.data.id; break;
               case 'layer': return 'Layer ' + cell.data.id; break;
               case 'node': return 'L' + cell.data.id[0] + ' [' + cell.data.id[1] + '] : ' + cell.data.val; break;
               default:
            }
         }
      }

      // Installs a popupmenu handler using local function (see below).
      graph.popupMenuHandler.factoryMethod = function(menu, cell, evt) { return createPopupMenu(graph, menu, cell, evt); };

      // Gets the default parent for inserting new cells. This is normally the first child of the root (ie. layer 0).
      var parent = graph.getDefaultParent();

      var ann = JSON.parse('{' +
         '"layers":[ 3, 10, 5, 8, 15, 1 ],' +
         '"bias":[ 1, 1, 1, 0, 0 ],' +
         '"nodes":[ "in", "sig", "sig", "sig", "acc", "max" ],' +
         '"draw":{ "nodesize": [15,5], "spacing": [150,40], "margin": [10,10,10,10] },' +
         '"rbias":[ 1, 0, 1, 0, 0]' +
      '}');

      if (ann.layers.length != ann.bias.length+1) {
         var msg = 'Lengths of ann.layers and annBias do not match!'
         mxUtils.error(msg, 400, false);
         //console.log(msg);
         return 1;
      }

      ann.bias.push(0);
      var annBLayers = []
      for (x = 0; x < ann.bias.length; x++) { annBLayers.push(ann.bias[x] + ann.layers[x]); }

      var box = graph.insertVertex(parent, "ann", '', 0, 0, 0, 0);

      var l = new Array(ann.layers.length);

      var n = new Array(ann.layers.length);
      for (x = 0; x < n.length; x++) { n[x] = new Array(annBLayers[x]); }

      var w = new Array(ann.layers.length-1);
      for (x = 0; x < w.length; x++) {
         w[x] = new Array(annBLayers[x]);
         for (y = 0; y < annBLayers[x]; y++) { w[x][y] = new Array(ann.layers[x+1]); }
      }

      var style = new Object();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
      graph.getStylesheet().putCellStyle('ROUNDED',style);

      function createANN() {
         graph.getModel().beginUpdate(); // Adds cells to the model in a single step
         try {
            // Compute height of the largest layer, to vertically center all of them
            //var height = ann.draw.spacing[1]*Math.max(...annBLayers);
            //var yoff = 0;

            //graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#2c2c2c', [box]);
            box.data = { type: 'model', id: 'Artifical Neural Network (model)' };

            // Add nodes
            for ( var x = 0; x < ann.layers.length; x++) {
               //l[x] = graph.insertVertex(box, "l"+x, '', x*ann.draw.spacing[0], 0, ann.draw.margin[1]+ann.draw.margin[3]+ann.draw.nodesize[0], height);
               //graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#444', [l[x]]);
               l[x] = graph.insertVertex(box, "l"+x, '', 0, 0, 0, 0);
               l[x].data = { type: 'layer', id: x };

               //yoff = ann.draw.margin[0]+(height-ann.draw.spacing[1]*annBLayers[x])/2;
               for ( var y = 0; y < ann.layers[x]; y++) {
                  //n[x][y] = graph.insertVertex(l[x], "n["+x+","+y+"]", '', ann.draw.margin[3], yoff+y*ann.draw.spacing[1], ann.draw.nodesize[0], ann.draw.nodesize[0], 'ROUNDED;fillColor=transparent;strokeColor=lightblue;strokeWidth='+ann.draw.nodesize[1]+';');
                  n[x][y] = graph.insertVertex(l[x], "n["+x+","+y+"]", '', 0, 0, 0, 0, 'ROUNDED;fillColor=transparent;');
                  n[x][y].data = { type: 'node', id: [x, y], val: ann.nodes[x]};
               }
               if (ann.bias[x]==1) {
                  //n[x][y] = graph.insertVertex(l[x], "n["+x+","+y+"]", '', ann.draw.margin[3], yoff+y*ann.draw.spacing[1], ann.draw.nodesize[0], ann.draw.nodesize[0], 'ROUNDED;fillColor=transparent;strokeColor=red;');
                  n[x][y] = graph.insertVertex(l[x], "n["+x+","+y+"]", '', 0, 0, 0, 0, 'ROUNDED;fillColor=transparent;');
                  n[x][y].data = { type: 'node', id: [x, y], val: ann.rbias[x]};
                  //if (ann.rbias[x]) { graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, 'lightblue', [n[x][y]]); }
               }
            }

            // Add weights
            for ( var x = 0; x < ann.layers.length-1; x++) {
               for ( var y = 0; y < annBLayers[x]; y++) {
                  for (z = 0; z < ann.layers[x+1]; z++) {
                     w[x][y][z] = graph.insertEdge(box, "w["+x+","+y+","+z+"]", '', n[x][y], n[x+1][z] );
                     //graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, '#ddd', [w[x][y][z]]);
                     w[x][y][z].data = { id: [x, y, z], val: 2*Math.random()-1 };
                  }
               }
            }
         }
         finally {
           //box.geometry.scale(1,1,true)
            // Updates the display
            graph.getModel().endUpdate();
         }
      }

      function layoutANN() {
         graph.getModel().beginUpdate();
         try {
            var height = ann.draw.spacing[1]*Math.max(...annBLayers);
            var yoff = 0;

            for ( var x = 0; x < ann.layers.length; x++) {
               var g = l[x].geometry;
               g.x = x*ann.draw.spacing[0];
               g.y = 0;
               g.width = ann.draw.margin[1]+ann.draw.margin[3]+ann.draw.nodesize[0];
               g.height = height;

               yoff = ann.draw.margin[0]+(height-ann.draw.spacing[1]*annBLayers[x])/2;
               for ( var y = 0; y < ann.layers[x]; y++) {
                 g = n[x][y].geometry;
                 g.x = ann.draw.margin[3];
                 g.y = yoff+y*ann.draw.spacing[1];
                 g.width = ann.draw.nodesize[0];
                 g.height = ann.draw.nodesize[0];
                 graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, ann.draw.nodesize[1], [n[x][y]]);
               }
               if (ann.bias[x]==1) {
                  g = n[x][y].geometry;
                  g.x = ann.draw.margin[3];
                  g.y = yoff+y*ann.draw.spacing[1];
                  g.width = ann.draw.nodesize[0];
                  g.height = ann.draw.nodesize[0];
                  graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, ann.draw.nodesize[1], [n[x][y]]);
               }
            }
         }
         finally {
            // Updates the display
            graph.getModel().endUpdate();
         }
      }

      function styleANN() {
         graph.getModel().beginUpdate(); // Adds cells to the model in a single step
         try {
            // Compute height of the largest layer, to vertically center all of them
            //var height = ann.draw.spacing[1]*Math.max(...annBLayers);
            //var yoff = 0;

            //graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#2c2c2c', [box]);
            box.data = { type: 'model', id: 'Artifical Neural Network (model)' };

            // Add nodes
            for ( var x = 0; x < ann.layers.length; x++) {
               //l[x] = graph.insertVertex(box, "l"+x, '', x*ann.draw.spacing[0], 0, ann.draw.margin[1]+ann.draw.margin[3]+ann.draw.nodesize[0], height);
               //graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, '#444', [l[x]]);
               l[x] = graph.insertVertex(box, "l"+x, '', 0, 0, 0, 0);
               l[x].data = { type: 'layer', id: x };

               //yoff = ann.draw.margin[0]+(height-ann.draw.spacing[1]*annBLayers[x])/2;
               for ( var y = 0; y < ann.layers[x]; y++) {
                  //n[x][y] = graph.insertVertex(l[x], "n["+x+","+y+"]", '', ann.draw.margin[3], yoff+y*ann.draw.spacing[1], ann.draw.nodesize[0], ann.draw.nodesize[0], 'ROUNDED;fillColor=transparent;strokeColor=lightblue;strokeWidth='+ann.draw.nodesize[1]+';');
                  n[x][y] = graph.insertVertex(l[x], "n["+x+","+y+"]", '', 0, 0, 0, 0, 'ROUNDED;fillColor=transparent;');
                  n[x][y].data = { type: 'node', id: [x, y], val: ann.nodes[x]};
               }
               if (ann.bias[x]==1) {
                  //n[x][y] = graph.insertVertex(l[x], "n["+x+","+y+"]", '', ann.draw.margin[3], yoff+y*ann.draw.spacing[1], ann.draw.nodesize[0], ann.draw.nodesize[0], 'ROUNDED;fillColor=transparent;strokeColor=red;');
                  n[x][y] = graph.insertVertex(l[x], "n["+x+","+y+"]", '', 0, 0, 0, 0, 'ROUNDED;fillColor=transparent;');
                  n[x][y].data = { type: 'node', id: [x, y], val: ann.rbias[x]};
                  //if (ann.rbias[x]) { graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, 'lightblue', [n[x][y]]); }
               }
            }

            // Add weights
            for ( var x = 0; x < ann.layers.length-1; x++) {
               for ( var y = 0; y < annBLayers[x]; y++) {
                  for (z = 0; z < ann.layers[x+1]; z++) {
                     //w[x][y][z] = graph.insertEdge(box, "w["+x+","+y+","+z+"]", '', n[x][y], n[x+1][z] );
                     //graph.setCellStyles(mxConstants.STYLE_STROKECOLOR, '#ddd', [w[x][y][z]]);
                     //w[x][y][z].data = { id: [x, y, z], val: 2*Math.random()-1 };
                  }
               }
            }
         }
         finally {
           //box.geometry.scale(1,1,true)
            // Updates the display
            graph.getModel().endUpdate();
         }
      }

      createANN();
      layoutANN();
      styleANN();
      //centerFit();
      graph.zoomOut();

      function f() {
         var colour = 'yellow';
         if (graph.getCellStyle(n[t_demo][t_demo]).fillColor == colour) { colour = 'purple'; }
         graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, colour, [n[t_demo][t_demo]]);
         graph.refresh();
         if (--t_demo==0) { clearInterval(fvar); }
      }

      var t_demo = 4;
      var i_demo = 100;

      var fvar = window.setInterval(f, 0);
      clearInterval(fvar);

      var buttons = document.getElementById('Actions');
      var bs = graph.getBorderSizes();
      buttons.style.top = (container.offsetTop + bs.y) + 'px';
      buttons.style.left = (container.offsetLeft + bs.x) + 'px';

      var left = 0;
      var bw = 16;
      var bh = 16;

      if (mxClient.IS_QUIRKS) { bw -= 1; bh -= 1; }

      function addButton(label, funct) {
         var btn = document.createElement('div');
         mxUtils.write(btn, label);
         btn.style = 'position:absolute;background-color:transparent;border:1px solid gray;text-align:center;font-size:10px;cursor:hand;width:'+ bw + 'px;height:' + bh + 'px;left:' + left + 'px;top:0px;';

         mxEvent.addListener(btn, 'click', function(evt) { funct(); mxEvent.consume(evt); });

         left += bw;
         buttons.appendChild(btn);
      };

      function centerFit() {
         graph.zoomActual();
         var margin = 2;
         var max = 3;

         var bounds = graph.getGraphBounds();
         var cw = graph.container.clientWidth - margin;
         var ch = graph.container.clientHeight - margin;
         var w = bounds.width / graph.view.scale;
         var h = bounds.height / graph.view.scale;
         var s = Math.min(max, Math.min(cw / w, ch / h));

         graph.view.scaleAndTranslate(s,
         (margin + cw - w * s) / (2 * s) - bounds.x / graph.view.scale,
         (margin + ch - h * s) / (2 * s) - bounds.y / graph.view.scale);
      }

      // Action buttons
      addButton('+', function() { graph.zoomIn(); });
      addButton('-', function() { graph.zoomOut(); });
      addButton('·', function() { graph.zoomActual(); });
      addButton('[]', centerFit );
      addButton('D', function() { t_demo = 4; fvar = window.setInterval(f, i_demo);} );
      addButton('L', function() { mxLog.show(); });
      addButton('F', function() {
         //mxUtils.popup('Kaixo', true);

         //var tb = document.createElement('div');
         var tb = document.getElementById('waveContainer');
         var wnd = new mxWindow('Title', tb, 100, 100, 200, 200, true, true);
         wnd.setVisible(true);

         /*
         var frame = document.createElement('iframe');
         frame.setAttribute('width', '800px');
         frame.setAttribute('height', '600px');
         frame.setAttribute('src', 'http://www.ehu.es/');
         frame.style.backgroundColor = 'white';
         var w = document.body.clientWidth;
         var h = (document.body.clientHeight || document.documentElement.clientHeight);
         var wnd = new mxWindow('Title', frame, (w-200)/2, (h-200)/3, 200, 200);
         wnd.setVisible(true);
         */

         wnd.setMaximizable(true);
         wnd.setClosable(true);
         wnd.setResizable(true);
      });
   }
};
