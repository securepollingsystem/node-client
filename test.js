var SPSClient = require('./')
var msg = process.argv[2] || 'I love ice cream'
var disk = require('./keys.js')

var client = SPSClient({opinions : ['i like ice cream','stop pets!','spaces not tabs']})
disk.loadKeys(client, function (err, client) {
  if (err) throw err
  var regSig = 'iamregistrar' //TODO: client should already know this

  disk.loadOpinions(client, function (err, client) {
    if (err) console.error(err)
    msg = client.opinions.join('\n')
    client.screed(msg, regSig, function (err, screed) {
      if (err) console.error(err)
      console.log(screed)
    })
  })
})
