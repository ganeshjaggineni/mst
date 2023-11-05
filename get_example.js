var express = require('express');
var app=express();
var fname="";
var lname="";
app.get('/insedu', function (req, res) {
fname=req.query['first_name'];
lname=req.query['last_name'];
res.send('<h1><p>Username: ' +fname +'</p><p>Lastname: '+lname+'</p></h1>');
})
console.log('Listening on port 8000...');
var server = app.listen(8000)
