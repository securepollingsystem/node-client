var SPSClient = require('./')

var client = SPSClient()
client.generateKeypair()
var regSig = 'iamregistrar'

client.screed('I love ice cream', regSig, function (err, screed) {
  if (err) throw err
  console.log(screed)
})
