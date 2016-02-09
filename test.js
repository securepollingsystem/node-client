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

var blinded_key = client.initBlindingSession(Q,R);

console.log(blinded_key.toBuffer().toString("hex"))


client.screed(msg, regSig, function (err, screed) {
  if (err) throw err
  console.log(screed)
})
