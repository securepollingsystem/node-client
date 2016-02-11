var SPSClient = require('./');
var client = SPSClient()
client.generateKeypair()

var express = require('express');
var connect = require('connect');
var bodyParser = require('body-parser');
var app = express();

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

app.post('/screed', function(req, res){
    var msg = req.body.screed
    var regSig = 'iamregistrar'
    client.displayScreed(msg, regSig, function (err, screed) {
      if (err) throw err
      // console.log(screed);
      res.send(screed);
      // res.render('screed', {screed: screed});
      res.end();
    });
});



