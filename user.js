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

function newRequest(Q, R, m) {
  // https://github.com/securepollingsystem/registrar/blob/c2a8102fc07cdc4f0ea3ae442707d50b3de6fb8f/blind/requester.go#L25
  let a, b, bInv, c;
}

function randFieldElement() {
  // https://github.com/securepollingsystem/registrar/blob/c2a8102fc07cdc4f0ea3ae442707d50b3de6fb8f/blind/random.go#L13
}

const BN = require('bn.js');

// https://github.com/securepollingsystem/registrar/blob/c2a8102fc07cdc4f0ea3ae442707d50b3de6fb8f/blind/secp256k1.go#L33
const Secp256kParams = {
	p: new BN('FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFE FFFFFC2F', 16),
	a: new BN('00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000', 16),
	b: new BN('00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000007', 16),
	// this is the compressed form of G... What does that mean?
	G: new BN('02 79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798', 16),
	n: new BN('FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFE BAAEDCE6 AF48A03B BFD25E8C D0364141', 16),
	h: new BN('01', 16),
/*
		P:       curve.P,
		N:       curve.N,
		B:       curve.B,
		Gx:      curve.Gx,
		Gy:      curve.Gy,
		BitSize: curve.BitSize,
*/
}

Object.assign(module.exports, {User, blindKey});
