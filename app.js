var SPSClient = require('./');
var client = SPSClient()
client.generateKeypair()
var regSig = 'iamregistrar'

var express = require('express');
var app = express();

app.use(express.bodyParser());

app.listen(3000)

app.get('/', function(req, res){
    res.render('index.jade');
});

app.get('/about', function(req, res){
    res.render('about.jade');
});





// app.post('/screed', function(req, res){
        // var msg = req.body.screed
//     res.send('Screed: ' + msg);

//     // client.screed(msg, regSig, function (err, screed) {
//     //   if (err) throw err
//     //   console.log(screed)
//     // })
// });
