var SPSClient = require('./')
var msg = process.argv[2] || 'I love ice cream'

var client = SPSClient()
client.generateKeypair()
var regSig = 'iamregistrar'


var example_registrar_keys = {
  Q: '0222a05c9a64a6f7afb72f571869b18b216de5de3545529fc3fee12755b9895ae7',
  R: '03b7c70964d75f1c4131fc53b5f05da16e6a85ebef65b48fa34b4764b46273cdc0'
};

var Q = new Buffer(example_registrar_keys.Q,'hex');
var R = new Buffer(example_registrar_keys.R,'hex');

var blinded_key = client.loadBlindingSession({
    a:new Buffer("0b74852ada93c1618e396e6a408d60cdc91706a803142418492d26f020a2e019",'hex'),
    b:new Buffer("078c28019f4e9f564c7cc38e95ab9d33f7ee821460f68f235d6815a5117abe66",'hex'),
    c:new Buffer("a396ca83be8ac2d39133e7a25553bee82c06f8a7fb28952130c98fd46df8ac78",'hex'),
    F:new Buffer("021f8891c9278551d85fd422409a3b53a22aad2681ce48422a66cca101ddb720cf",'hex')
});

var blinded_sig= new Buffer("03b7c70964d75f1c4131fc53b5f05da16e6a85ebef65b48fa34b4764b46273cdc0");

var sig = client.unblindSig(blinded_sig);

console.log(sig)



// client.screed(msg, regSig, function (err, screed) {
//   if (err) throw err
//   console.log(screed)
// })
