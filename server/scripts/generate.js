const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { utils, getPublicKey } = require("@noble/secp256k1");
const secp = secp256k1;
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = utils.randomPrivateKey();
console.log(`Private key:\t ${toHex(privateKey).trim()}`);

const publicKey = getPublicKey(privateKey);
console.log(`Public key:\t ${toHex(publicKey)}`);

// const address = is the last 20 bytes of the keccak256 hash of the public key
const address = toHex(publicKey.slice(-20));

console.log(`Address:\t 0x${address}`);
