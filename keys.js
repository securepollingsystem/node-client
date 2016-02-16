var level = require('level') // levelDB for data storage
var db = level('./data')

module.exports = loadKeys

function loadKeys (client, cb) {
  db.get('publicKey',{encoding:'binary'},function (err, value) {
    if (err) return keysNotFound()
    client.publicKey = value
    db.get('privateKey',{encoding:'binary'},function (err, value) {
      if (err) return keysNotFound()
      client.privateKey = value
      console.log('key pair found and loaded')
      // TODO: verify keys and talk to registrar
      cb(null, client)
    })
  })

  function keysNotFound() {
    console.log('key pair NOT found, generating new ones')
    client.generateKeypair()
    db.put('publicKey', client.publicKey, function (err) {
      if (err) return cb(new Error("can't write publicKey!"))
      db.put('privateKey', client.privateKey, function (err) {
        if (err) return cb(new Error("can't write privateKey!"))
        console.log('new keys saved')
        loadKeys(client, cb)
      })
    })
  }
}

