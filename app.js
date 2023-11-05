var express = require('express')
 // create express application instance
var app = express()
  // express route
app.get('/', function (req, res) {
   res.send('This is a Sample Example for Express.js ')
})
 var server = app.listen(8000) // start server
