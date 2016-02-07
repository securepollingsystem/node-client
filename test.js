var SPSClient = require('./')
var msg = process.argv[2] || 'I love ice cream'

var client = SPSClient()
client.generateKeypair()
var regSig = 'iamregistrar'

client.screed(msg, regSig, function (err, screed) {
  if (err) throw err
  console.log(screed)
})
