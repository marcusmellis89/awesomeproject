var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8000;

var auth = require('./middleware/auth.js');


// app.use('/', function(req, res){
//   res.send('hello world');
// })
// console.log(path.join(__dirname,'../index.html'));
app.use(express.static(path.join(__dirname,'../')));

app.use('/authenticate', auth.authenticate());


app.listen(PORT);
console.log('listening on 8000...')