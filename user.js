const { createECDH } = require('crypto'),
  secp256k1 = 'secp256k1';

class User {
  // I think ECDH and ECDSA keys are generally interchangable.
  generateKeypair() {
    this.ecdh = createECDH('secp256k1');
    this.keys = this.ecdh.generateKeys();
  }
  sendBlindedKey() {
    // copy the go implementation here:
    // https://github.com/securepollingsystem/registrar/blob/c2a8102fc07cdc4f0ea3ae442707d50b3de6fb8f/voter/voter.go#L37
    // 
    // the bulk of this will be copying the blinding stuff from here:
    // https://github.com/securepollingsystem/registrar/blob/c2a8102fc07cdc4f0ea3ae442707d50b3de6fb8f/blind/requester.go#L25
  }
  getSignature() {
  }
}

function blindKey(pubKey) {
}

Object.assign(module.exports, {User, blindKey});
