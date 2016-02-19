var SPSClient = require('./');
var client = SPSClient({opinions : ['i like ice cream','stop pets!','spaces not tabs']})
client.generateKeypair()

var express = require('express');
var connect = require('connect');
var bodyParser = require('body-parser');
var app = express();

var disk = require('./disk.js');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.listen(3000)

app.get('/', function(req, res){
    res.render('index');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/opinions', function(req, res){
    disk.loadOpinions(client, function (err, client) {
      if (err) console.error(err)
      opinions = client.opinions
      res.render('opinions', {opinions: opinions})
    })
});

app.post('/opinions/create', function(req, res){
    var msg = req.body.screed
    var regSig = 'iamregistrar'
    client.opinions.push(msg)
    res.redirect('/opinions')
});



