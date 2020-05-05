// Function to create the entries in the popupmenu
function createPopupMenu(graph, menu, cell, evt) {
   if (cell != null) {
      menu.addItem('Cell Item', 'images/image.gif', function() { mxUtils.alert('MenuItem1'); });
   } else {
      menu.addItem('No-Cell Item', 'images/image.gif', function() { mxUtils.alert('MenuItem2'); });
   }
   //menu.addSeparator();
   //menu.addItem('MenuItem3', 'images/warning.gif', function() { mxUtils.alert('MenuItem3: '+graph.getSelectionCount()+' selected');});

   menu.addSeparator();

   var m_add = menu.addItem('Add', '', function(){});
          menu.addItem('Device/Board', '', function(){}, m_add, false, false);
          var m_add_iprepo = menu.addItem('IP repository', '', function(){}, m_add);
             var m_add_iprepo_lib = menu.addItem('Library', '', function(){}, m_add_iprepo);
                var m_add_iprepo_lib_ip = menu.addItem('IP', '', function(){}, m_add_iprepo_lib);
                   menu.addItem('Architecture', '', function(){}, m_add_iprepo_lib_ip, false, false);
                   menu.addItem('Testbench', '', function(){}, m_add_iprepo_lib_ip, false, false);
                   menu.addItem('Model', '', function(){}, m_add_iprepo_lib_ip, false, false);
                   menu.addItem('Waveform', '', function(){}, m_add_iprepo_lib_ip, false, false);
                menu.addItem('(another IP)', '', function(){}, m_add_iprepo_lib, false, false);
                menu.addItem('(another IP)', '', function(){}, m_add_iprepo_lib, false, false);
                menu.addItem('...', '', function(){}, m_add_iprepo_lib);
            menu.addItem('(another Library)', '', function(){}, m_add_iprepo, false, false);
            menu.addItem('(another Library)', '', function(){}, m_add_iprepo, false, false);
            menu.addItem('...', '', function(){}, m_add_iprepo, false, false);
          menu.addItem('(another) IP repository', '', function(){}, m_add, false, false);
          menu.addItem('...', '', function(){}, m_add, false, false);
      menu.addSeparator(m_add);
      var m_add_mxgraph = menu.addItem('mxGraph', '', function(){}, m_add);
         menu.addItem('General', '', function(){}, m_add_mxgraph, false, false);
         menu.addItem('Misc', '', function(){}, m_add_mxgraph, false, false);
         menu.addItem('Advanced', '', function(){}, m_add_mxgraph, false, false);
         menu.addItem('Basic', '', function(){}, m_add_mxgraph, false, false);
         menu.addItem('Arrows', '', function(){}, m_add_mxgraph, false, false);
         menu.addItem('UML', '', function(){}, m_add_mxgraph, false, false);
         menu.addItem('BPMN General', '', function(){}, m_add_mxgraph, false, false);
         menu.addItem('Flowchart', '', function(){}, m_add_mxgraph, false, false);
         menu.addItem('Clipart', '', function(){}, m_add_mxgraph, false, false);

  var m_file = menu.addItem('File', '', function(){});
      menu.addItem('New', '', function(){}, m_file, false, false);
      menu.addItem('Open', '', function(){}, m_file, false, false);
      menu.addSeparator(m_file);
      var m_file_settings = menu.addItem('Settings', '', function(){}, m_file);
         menu.addItem('Manage remotes', '', function(){}, m_file_settings, false, false);
         menu.addItem('GUI Style', '', function(){}, m_file_settings, false, false);
      menu.addSeparator(m_file);
      menu.addItem('Save [Ctrl+S]', '', function(){}, m_file, false, false);
      menu.addItem('Save as... [Ctrl+Shift+S]', '', function(){}, m_file, false, false);
      menu.addSeparator(m_file);
      menu.addItem('Import...', '', function(){}, m_file, false, false);
      menu.addItem('Export...', '', function(){}, m_file, false, false);
      menu.addSeparator(m_file);
      menu.addItem('Page Setup...', '', function(){}, m_file, false, false);
      menu.addItem('Print... [Ctrl+P]', '', function(){}, m_file, false, false);

   var m_edit = menu.addItem('Edit', '', function(){});
       menu.addItem('Undo [Ctrl+Z]', '', function(){}, m_edit, false, false);
       menu.addItem('Redo [Ctrl+Y]', '', function(){}, m_edit, false, false);
       menu.addSeparator(m_edit);
       menu.addItem('Cut [Ctrl+X]', '', function(){}, m_edit, false, false);
       menu.addItem('Copy [Ctrl+C]', '', function(){}, m_edit, false, false);
       menu.addItem('Paste [Ctrl+V]', '', function(){}, m_edit, false, false);
       menu.addItem('Delete [Delete]', '', function(){}, m_edit, false, false);
       menu.addSeparator(m_edit);
       menu.addItem('Duplicate [Ctrl+D]', '', function(){}, m_edit, false, false);
       menu.addSeparator(m_edit);
       menu.addItem('Edit Data... [Ctrl+M]', '', function(){}, m_edit, false, false);
       menu.addItem('Edit Tooltip...', '', function(){}, m_edit, false, false);
       menu.addItem('Edit Style... [Ctrl+E]', '', function(){}, m_edit, false, false);
       menu.addSeparator(m_edit);
       menu.addItem('Edit [F2 / Enter]', '', function(){}, m_edit, false, false);
       menu.addSeparator(m_edit);
       menu.addItem('Edit Link...', '', function(){}, m_edit, false, false);
       menu.addItem('Open Link', '', function(){}, m_edit, false, false);
       menu.addSeparator(m_edit);
       menu.addItem('Select Vertices [Ctrl+Shift+I]', '', function(){}, m_edit, false, false);
       menu.addItem('Select Edges [Ctrl+Shift+E]', '', function(){}, m_edit, false, false);
       menu.addItem('Select All [Ctrl+A]', '', function(){}, m_edit, false, false);
       menu.addItem('Select None [Ctrl+Shift+A]', '', function(){}, m_edit, false, false);
       menu.addSeparator(m_edit);
       menu.addItem('Lock/Unlock [Ctrl+L]', '', function(){}, m_edit, false, false);

   var m_view = menu.addItem('View', '', function(){});
       menu.addItem('Format Panel [Ctrl+Shift+P]', '', function(){}, m_view, false, false);
       menu.addItem('Outline [Ctrl+Shift+O]', '', function(){}, m_view, false, false);
       menu.addItem('Layers [Ctrl+Shift+L]', '', function(){}, m_view, false, false);
       menu.addSeparator(m_view);
       menu.addItem('Page View', '', function(){}, m_view, false, false);
       menu.addItem('Page Scale...', '', function(){}, m_view, false, false);
       menu.addSeparator(m_view);
       menu.addItem('Scrollbars', '', function(){}, m_view, false, false);
       menu.addItem('Tooltips', '', function(){}, m_view, false, false);
       menu.addSeparator(m_view);
       menu.addItem('Grid [Ctrl+Shift+G]', '', function(){}, m_view, false, false);
       menu.addItem('Guides', '', function(){}, m_view, false, false);
       menu.addSeparator(m_view);
       menu.addItem('Connection arrows [Ctrl+Q]', '', function(){}, m_view, false, false);
       menu.addItem('Connection points [Ctrl+Shift+Q]', '', function(){}, m_view, false, false);
       menu.addSeparator(m_view);
       var m_view_zoom = menu.addItem('Zoom', '', function(){}, m_view);
          menu.addItem('Reset View [Ctrl+H]', '', function(){}, m_view_zoom, false, false);
          menu.addItem('Zoom In [Ctrl + / Alt+Mousewheel]', '', function(){}, m_view_zoom, false, false);
          menu.addItem('Zoom Out [Ctrl - / Alt+Mousewheel]', '', function(){}, m_view_zoom, false, false);
          var zoom_factors = [25, 50, 75, 100, 125, 150, 200, 300, 400, 500];
          for ( var x = 0; x < zoom_factors.length; x++ ) {
             menu.addItem(zoom_factors[x] + '%', '', function(){}, m_view_zoom, false, false);
          }
          menu.addSeparator(m_view_zoom);
          menu.addItem('Fit Window [Ctrl+Shift+H]', '', function(){}, m_view_zoom, false, false);
          menu.addItem('Page Width', '', function(){}, m_view_zoom, false, false);
          menu.addItem('One Page [Ctrl+J]', '', function(){}, m_view_zoom, false, false);
          menu.addItem('Two Pages [Ctrl+Shift+J]', '', function(){}, m_view_zoom, false, false);
          menu.addSeparator(m_view_zoom);
          menu.addItem('Custom... [Ctrl+0]', '', function(){}, m_view_zoom, false, false);
       menu.addSeparator(m_view);
       menu.addItem('Source...', '', function(){}, m_view, false, false);

   var m_object = menu.addItem('Object', '', function(){});
       menu.addItem('To Front [Ctrl+Shift+F]', '', function(){}, m_object, false, false);
       menu.addItem('To Back [Ctrl+Shift+B]', '', function(){}, m_object, false, false);
       menu.addSeparator(m_object);
       menu.addItem('Direction >', '', function(){}, m_object, false, false);
       menu.addItem('Rotate 90º / Reverse [Ctrl+R]', '', function(){}, m_object, false, false);
       menu.addSeparator(m_object);
       menu.addItem('Align >', '', function(){}, m_object, false, false);
       menu.addItem('Distribute >', '', function(){}, m_object, false, false);
       menu.addSeparator(m_object);
       menu.addItem('Navigation >', '', function(){}, m_object, false, false);
       var m_object_insert = menu.addItem('Insert', '', function(){}, m_object);
          menu.addItem('Insert Link...', '', function(){}, m_object_insert, false, false);
          menu.addItem('Insert Image...', '', function(){}, m_object_insert, false, false);
       var m_object_layout = menu.addItem('Layout', '', function(){}, m_object);
          menu.addItem('Horizontal Flow', '', function(){}, m_object_layout, false, false);
          menu.addItem('Vertical Flow', '', function(){}, m_object_layout, false, false);
          menu.addSeparator(m_object_layout);
          menu.addItem('Horizontal Tree', '', function(){}, m_object_layout, false, false);
          menu.addItem('Vertical Tree', '', function(){}, m_object_layout, false, false);
          menu.addItem('Radial Tree', '', function(){}, m_object_layout, false, false);
          menu.addSeparator(m_object_layout);
          menu.addItem('Organic', '', function(){}, m_object_layout, false, false);
          menu.addItem('Circle', '', function(){}, m_object_layout, false, false);
       menu.addSeparator(m_object);
       menu.addItem('Group [Ctrl+G]', '', function(){}, m_object, false, false);
       menu.addItem('Ungroup [Ctrl+Shift+U]', '', function(){}, m_object, false, false);
       menu.addItem('Remove from Group', '', function(){}, m_object, false, false);
       menu.addSeparator(m_object);
       menu.addItem('Clear Waypoints [Alt+Shift+C]', '', function(){}, m_object, false, false);
       menu.addItem('Autosize [Ctrl+Shift+Y]', '', function(){}, m_object, false, false);

   var m_extras = menu.addItem('Extras', '', function(){});
       menu.addItem('Copy on Connect', '', function(){}, m_extras, false, false);
       menu.addItem('Collapse/Expand', '', function(){}, m_extras, false, false);
       menu.addSeparator(m_extras);
       menu.addItem('Edit Diagram...', '', function(){}, m_extras, false, false);

   var m_help = menu.addItem('Help', '', function(){});
       menu.addItem('Version XXXX', '', function(){}, m_help, false, false);
       menu.addItem('Check for update', '', function(){}, m_help, false, false);
       menu.addSeparator(m_help);
       menu.addItem('Documentation', '', function(){}, m_help, false, false);
       menu.addItem('Frequently Asked Questions', '', function(){}, m_help, false, false);
       menu.addSeparator(m_help);
       var m_help_community = menu.addItem('Community', '', function(){}, m_help);
          menu.addItem('Wiki', '', function(){}, m_help_community, false, false);
          menu.addItem('Discussions', '', function(){}, m_help_community, false, false);
       var m_help_issues = menu.addItem('Issues', '', function(){}, m_help);
          menu.addItem('Report', '', function(){}, m_help_issues, false, false);
          menu.addItem('Search', '', function(){}, m_help_issues, false, false);
       menu.addSeparator(m_help);
       menu.addItem('About ELIDE... [F1]', '', function(){}, m_help, false, false);

   menu.addSeparator();

   var m_style = menu.addItem('Style', '', function(){});
       menu.addItem('Fill Color...', '', function(){}, m_style, false, false);
       menu.addItem('Line Color...', '', function(){}, m_style, false, false);
       menu.addItem('Shadow', '', function(){}, m_style, false, false);

   var m_connection = menu.addItem('Connection', '', function(){});
       menu.addItem('Line', '', function(){}, m_connection, false, false);
       menu.addItem('Link', '', function(){}, m_connection, false, false);
       menu.addItem('Arrow', '', function(){}, m_connection, false, false);
       menu.addItem('Simple Arrow', '', function(){}, m_connection, false, false);

   var m_waypoints = menu.addItem('Waypoints', '', function(){});
       menu.addItem('Straight', '', function(){}, m_waypoints, false, false);
       menu.addItem('Orthogonal', '', function(){}, m_waypoints, false, false);
       menu.addItem('Simple', '', function(){}, m_waypoints, false, false);
       menu.addItem('Simple', '', function(){}, m_waypoints, false, false);
       menu.addItem('Isometric', '', function(){}, m_waypoints, false, false);
       menu.addItem('Isometric', '', function(){}, m_waypoints, false, false);
       menu.addItem('Curved', '', function(){}, m_waypoints, false, false);
       menu.addItem('Curved', '', function(){}, m_waypoints, false, false);

};
