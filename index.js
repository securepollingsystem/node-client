var crypto = require('crypto')
var eccrypto = require('eccrypto')

module.exports = SPSClient

var prefix = '-----BEGIN SPS SCREED TEXT-----'
var sigPrefix = '-----BEGIN SPS SCREED SIG-----'
var publicKeyPrefix = '-----BEGIN SPS SCREED PUBLIC KEY-----'
var keySigPrefix = '-----BEGIN SPS KEY SIG-----'
var suffix = '-----END SPS SCREED-----'

function SPSClient (opts) {
  if (!(this instanceof SPSClient)) return new SPSClient(opts)
  if (!opts) opts = {}
  this.privateKey = opts.privateKey
  this.publicKey = opts.publicKey
  this.opinions = opts.opinions || ['no opinions loaded']
}

SPSClient.prototype.generateKeypair = function () {
  this.privateKey = crypto.randomBytes(32)
  this.publicKey = eccrypto.getPublic(this.privateKey)
}

SPSClient.prototype._sign = function (str, cb) { 
  var self = this
  var msg = crypto.createHash("sha256").update(str).digest();
  eccrypto.sign(self.privateKey, msg).then(function (sig) {
    cb(null, sig)
  }).catch(function (err) {
    cb(err)
  })
}

SPSClient.prototype.screed = function (msg, regSig, cb) {
  var self = this
  self._sign(msg, function (err, sig) {
    if (err) return cb(err)
    var screed = ''
    screed += prefix + '\n'
    screed += msg + '\n'
    screed += sigPrefix + '\n'
    screed += new Buffer(new Uint8Array(sig)).toString('base64') + '\n'
    screed += publicKeyPrefix + '\n'
    screed += new Buffer(new Uint8Array(self.publicKey)).toString('base64') + '\n'
    screed += keySigPrefix + '\n'
    screed += regSig + '\n'
    screed += suffix
    return cb(null, screed)
  })
}

SPSClient.prototype.displayScreed = function (msg, regSig, cb) {
  var self = this
  self._sign(msg, function (err, sig) {
    if (err) return cb(err)
    var screed = {
      index:  Math.floor((Math.random() * 100) + 1),
      opinion: msg,
      screedSig: new Buffer(new Uint8Array(sig)).toString('base64'),
      screedPubKey: new Buffer(new Uint8Array(self.publicKey)).toString('base64'),
      regSig: regSig
    }
    console.log(JSON.stringify(screed))
    return cb(null, screed)
  })
}

