# SPS Client

This is a Node.js client for Secure Polling System. Works in the browser with help from browserify.

## Example

```js
var SPSClient = require('./')

var client = SPSClient()
client.generateKeypair()

var msg = 'I love ice cream'
var regSig = 'iamregistrar'

client.screed(msg, regSig, function (err, screed) {
  if (err) throw err
  console.log(screed)
})
```

### ```client.generateKeypair()````

Generates a new [elliptic curve keypair](https://github.com/bitchan/eccrypto).

### ```client.screed(msg, registrarSignature, cb)```

Create a SPS screed for the given message. Requires a registrar signature, which will be included in the screed. cb returns (err, screed)


