var req = new XMLHttpRequest()
req.onreadystatechange = function() {
   try {
      if (this.readyState === XMLHttpRequest.DONE) {
         if (this.status === 200) {
            mxUtils.popup(this.response, true)
            var myArr = JSON.parse(this.responseText);
            console.log(myArr)
         } else {
            alert(this.readyState, 'There was a problem with the request.');
         }
      }
   }
   catch( e ) {
      alert('Caught Exception: ' + e.description);
   }
};
//req.open("POST", "/ajax")
//req.send('Kaixo! ')
