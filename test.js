var SPSClient = require('./')
var level = require('level') // levelDB for data storage
var msg = process.argv[2] || 'I love ice cream'

var client = SPSClient()

var db = level('./data')

loadKeys()

function loadKeys () {
  db.get('publicKey',{encoding:'binary'},function (err, value) {
    if (err) return keysNotFound()
    client.publicKey = value
    db.get('privateKey',{encoding:'binary'},function (err, value) {
      if (err) return keysNotFound()
      client.privateKey = value
      console.log('key pair found and loaded')
      // TODO: verify keys and talk to registrar
      createScreed(client)
    })
  })
}

function keysNotFound() {
  console.log('key pair NOT found, generating new ones')
  client.generateKeypair()
  db.put('publicKey', client.publicKey, function (err) {
    if (err) return console.log("can't write publicKey!", err)
    db.put('privateKey', client.privateKey, function (err) {
      if (err) return console.log("can't write privateKey!", err)
      console.log('new keys saved')
      loadKeys()
    })
  })
}

function createScreed (client) {
  var regSig = 'iamregistrar' //TODO: client should already know this

  client.screed(msg, regSig, function (err, screed) {
    if (err) console.error(err)
    console.log(screed)
  })
}
