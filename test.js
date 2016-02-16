var SPSClient = require('./')
var msg = process.argv[2] || 'I love ice cream'
var loadKeys = require('./keys.js')

var client = SPSClient()
loadKeys(client, function (err, client) {
  if (err) throw err
  var regSig = 'iamregistrar' //TODO: client should already know this

  client.screed(msg, regSig, function (err, screed) {
    if (err) console.error(err)
    console.log(screed)
  })
})
