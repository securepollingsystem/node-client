var crypto = require('crypto');
var eccrypto = require('eccrypto');

var BigInteger = require('bigi');
var ecurve = require('ecurve');
var ecparams = ecurve.getCurveByName('secp256k1');

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
  this.blindingSession = {};
}

SPSClient.prototype.initBlindingSession= function(registrar_q,registrar_r){
    var r = ecurve.Point.decodeFrom(ecparams,registrar_r);
    var q = ecurve.Point.decodeFrom(ecparams,registrar_q);

    while (true) {
        var a = crypto.randomBytes(32);
        var b = crypto.randomBytes(32);
        var c = crypto.randomBytes(32);

        var bInv = BigInteger.fromBuffer(b).modInverse(ecparams.n);
        var abInv = BigInteger.fromBuffer(a).multiply(bInv).mod(ecparams.n);
        var bInvR = r.multiply(bInv);
        var abInvQ = q.multiply(abInv);
        var cG = ecparams.G.multiply(BigInteger.fromBuffer(c));

        var F = bInvR.add(abInvQ).add(cG);

        if (F.x !== 0 && F.y !== 0){
            this.blindingSession.a =a;
            this.blindingSession.b =b;
            this.blindingSession.c =c;
            this.blindingSession.F = F
            break;
        }
    }

    var blind_r = this.blindingSession.F.x.mod(ecparams.n);
    var blind_m = blind_r.multiply(BigInteger.fromBuffer(this.blindingSession.b)).multiply(BigInteger.fromBuffer(this.publicKey)).add(BigInteger.fromBuffer(this.blindingSession.a)).mod(ecparams.n)
    return blind_m;
}

SPSClient.prototype.unblindSig = function(blindedSig){
    var bInv = BigInteger.fromBuffer(this.blindingSession.b).modInverse(ecparams.n);
    var s = bInv.multiply(BigInteger.fromBuffer(new Buffer(blindedSig,'hex'))).add(BigInteger.fromBuffer(this.blindingSession.c)).bnMod(ecparams.n)
    return {
        s:s,
        F:this.blindingSession.F
    }
    //TODO figure out serialization of the unblinded
};

SPSClient.prototype.generateKeypair = function () {
  this.privateKey = crypto.randomBytes(32)
  this.publicKey = eccrypto.getPublic(this.privateKey)
}


SPSClient.prototype._sign = function (str, cb) { 
  var self = this
  var msg = crypto.createHash("sha256").update(str).digest();
  eccrypto.sign(self.privateKey, msg).then(function (sig) {
    return cb(null, sig)
  }).catch(function (err) {
    throw err
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

