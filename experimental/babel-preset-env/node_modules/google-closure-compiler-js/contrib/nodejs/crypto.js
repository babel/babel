/*
 * Copyright 2012 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Definitions for node's crypto module. Depends on the buffer module.
 * @see http://nodejs.org/api/crypto.html
 * @see https://github.com/joyent/node/blob/master/lib/crypto.js
 */

var stream = require('stream');

/**
 * @const
 */
var crypto = {};

/**
 * @type {string}
 */
crypto.DEFAULT_ENCODING;

/**
 * @constructor
 */
crypto.Credentials = function () {};

/** @type {string|Buffer} */
crypto.Credentials.prototype.pfx;

/** @type {string|Buffer} */
crypto.Credentials.prototype.key;

/** @type {string} */
crypto.Credentials.prototype.passphrase;

/** @type {string|Buffer} */
crypto.Credentials.prototype.cert;

/** @type {Array.<string|Buffer>} */
crypto.Credentials.prototype.ca;

/** @type {Array.<string>|string} */
crypto.Credentials.prototype.crl;

/** @type {string} */
crypto.Credentials.prototype.ciphers;

/**
 * @param {Object.<string,string>=} details
 * @return {crypto.Credentials}
 */
crypto.createCredentials;

/**
 * @param {string} algorithm
 * @return {crypto.Hash}
 */
crypto.createHash;

/**
 * @param {string} algorithm
 * @param {Object=} options
 * @constructor
 * @extends stream.Transform
 */
crypto.Hash = function(algorithm, options) {};

/**
 * @param {string|Buffer} data
 * @param {string=} input_encoding
 * @return {void}
 */
crypto.Hash.prototype.update;

/**
 * @param {string=} encoding
 * @return {string}
 */
crypto.Hash.prototype.digest;

/**
 * @param {string} algorithm
 * @param {string|Buffer} key
 * @return {crypto.Hmac}
 */
crypto.createHmac;

/**
 * @param {string} hmac
 * @param {string|Buffer} key
 * @param {Object=} options
 * @constructor
 * @extends stream.Transform
 */
crypto.Hmac = function(hmac, key, options) {};

/**
 * @param {string|Buffer} data
 * @return {void}
 */
crypto.Hmac.prototype.update;

/**
 * @param {string} encoding
 * @return {void}
 */
crypto.Hmac.prototype.digest;

/**
 * @param {string} algorithm
 * @param {string|Buffer} password
 * @return {crypto.Cipher}
 */
crypto.createCipher;

/**
 * @param {string} algorithm
 * @param {string|Buffer} key
 * @param {string|Buffer} iv
 * @return {crypto.Cipheriv}
 */
crypto.createCipheriv;

/**
 * @param {string|Buffer} cipher
 * @param {string} password
 * @param {Object=} options
 * @constructor
 * @extends stream.Transform
 */
crypto.Cipher = function(cipher, password, options) {};

/**
 * @param {string|Buffer} data
 * @param {string=} input_encoding
 * @param {string=} output_encoding
 * @return {string|Buffer}
 */
crypto.Cipher.prototype.update;

/**
 * @name crypto.Cipher.prototype.final
 * @param {string=} output_encoding
 * @return {string|Buffer}
 */
crypto.Cipher.prototype.final;

/**
 * @param {boolean=} auto_padding
 * @return {void}
 */
crypto.Cipher.prototype.setAutoPadding;

/**
 * Note:  Cipheriv mixes update, final, and setAutoPadding from Cipher but
 * doesn't inherit directly from Cipher.
 *
 * @param {string} cipher
 * @param {string|Buffer} key
 * @param {string|Buffer} iv
 * @constructor
 * @extends stream.Transform
 */
crypto.Cipheriv = function(cipher, key, iv) {};

/**
 * @param {string|Buffer} data
 * @param {string=} input_encoding
 * @param {string=} output_encoding
 * @return {string|Buffer}
 */
crypto.Cipheriv.prototype.update;

/**
 * @name crypto.Cipheriv.prototype.final
 * @param {string=} output_encoding
 * @return {string|Buffer}
 */
crypto.Cipheriv.prototype.final;

/**
 * @param {boolean=} auto_padding
 * @return {void}
 */
crypto.Cipheriv.prototype.setAutoPadding;

/**
 * @param {string} algorithm
 * @param {string|Buffer} password
 * @return {crypto.Decipher}
 */
crypto.createDecipher;

/**
 * @param {string} algorithm
 * @param {string|Buffer} key
 * @param {string|Buffer} iv
 * @return {crypto.Decipheriv}
 */
crypto.createDecipheriv;

/**
 * Note:  Decipher mixes update, final, and setAutoPadding from Cipher but
 * doesn't inherit directly from Cipher.
 *
 * @param {string|Buffer} cipher
 * @param {string|Buffer} password
 * @param {Object=} options
 * @constructor
 * @extends stream.Transform
 */
crypto.Decipher = function(cipher, password, options) {}

/**
 * @param {string|Buffer} data
 * @param {string=} input_encoding
 * @param {string=} output_encoding
 * @return {string|Buffer}
 */
crypto.Decipher.prototype.update;

/**
 * @name crypto.Decipher.prototype.final
 * @param {string=} output_encoding
 * @return {string|Buffer}
 */
crypto.Decipher.prototype.final;

/**
 * @param {string=} output_encoding
 * @return {string|Buffer}
 */
crypto.Decipher.prototype.finaltol;

/**
 * @param {boolean=} auto_padding
 * @return {void}
 */
crypto.Decipher.prototype.setAutoPadding;

/**
 * Note:  Decipheriv mixes update, final, and setAutoPadding from Cipher but
 * doesn't inherit directly from Cipher.
 *
 * @param {string|Buffer|crypto.Decipheriv} cipher
 * @param {string|Buffer} key
 * @param {string|Buffer} iv
 * @param {Object=} options
 * @constructor
 * @extends stream.Transform
 */
crypto.Decipheriv = function(cipher, key, iv, options) {};

/**
 * @param {string|Buffer} data
 * @param {string=} input_encoding
 * @param {string=} output_encoding
 * @return {string|Buffer}
 */
crypto.Decipheriv.prototype.update;

/**
 * @name crypto.Decipheriv.prototype.final
 * @param {string=} output_encoding
 * @return {string|Buffer}
 */
crypto.Decipheriv.prototype.final;

/**
 * @param {string=} output_encoding
 * @return {string|Buffer}
 */
crypto.Decipheriv.prototype.finaltol;

/**
 * @param {boolean=} auto_padding
 * @return {void}
 */
crypto.Decipheriv.prototype.setAutoPadding;

/**
 * @param {string} algorithm
 * @return {crypto.Sign}
 */
crypto.createSign;

/**
 * @param {string} algorithm
 * @param {Object=} options
 * @constructor
 * @extends stream.Writable
 */
crypto.Sign = function(algorithm, options) {};

/**
 * @param {string|Buffer} data
 * @return {void}
 */
crypto.Sign.prototype.update;

/**
 * @param {string} private_key
 * @param {string=} output_format
 * @return {string|Buffer}
 */
crypto.Sign.prototype.sign;

/**
 * @param {string} algorithm
 * @return crypto.Verify
 */
crypto.createVerify;

/**
 * @param {string} algorithm
 * @param {Object=} options
 * @constructor
 * @extends stream.Writable
 */
crypto.Verify = function(algorithm, options) {};

/**
 * @param {string|Buffer} data
 * @return {void}
 */
crypto.Verify.prototype.update;

/**
 * @param {string} object
 * @param {string|Buffer} signature
 * @param {string=} signature_format
 * @return {boolean}
 */
crypto.Verify.prototype.verify;

/**
 * @param {number} prime
 * @param {string=} encoding
 * @return {crypto.DiffieHellman}
 */
crypto.createDiffieHellman;

/**
 * @param {number} sizeOrKey
 * @param {string=} encoding
 * @constructor
 */
crypto.DiffieHellman = function(sizeOrKey, encoding) {};

/**
 * @param {string=} encoding
 * @return {string|Buffer}
 */
crypto.DiffieHellman.prototype.generateKeys;

/**
 * @param {string|Buffer} key
 * @param {string=} inEnc
 * @param {string=} outEnc
 * @return {string|Buffer}
 */
crypto.DiffieHellman.prototype.computeSecret;

/**
 * @param {string=} encoding
 * @return {string|Buffer}
 */
crypto.DiffieHellman.prototype.getPrime;

/**
 * @param {string=} encoding
 * @return {string|Buffer}
 */
crypto.DiffieHellman.prototype.getGenerator;

/**
 * @param {string=} encoding
 * @return {string|Buffer}
 */
crypto.DiffieHellman.prototype.getPublicKey;

/**
 * @param {string} encoding
 * @return {string|Buffer}
 */
crypto.DiffieHellman.prototype.getPrivateKey = function(encoding) {}

/**
 * @param {string|Buffer} key
 * @param {string=} encoding
 * @return {crypto.DiffieHellman}
 */
crypto.DiffieHellman.prototype.setPublicKey;

/**
 * @param {string|Buffer} key
 * @param {string=} encoding
 * @return {crypto.DiffieHellman}
 */
crypto.DiffieHellman.prototype.setPrivateKey;

/**
 * Note:  DiffieHellmanGroup mixes DiffieHellman but doesn't inherit directly.
 *
 * @param {string} name
 * @constructor
 */
crypto.DiffieHellmanGroup = function(name) {};

/**
 * @param {string=} encoding
 * @return {string|Buffer}
 */
crypto.DiffieHellmanGroup.prototype.generateKeys;

/**
 * @param {string|Buffer} key
 * @param {string=} inEnc
 * @param {string=} outEnc
 * @return {string|Buffer}
 */
crypto.DiffieHellmanGroup.prototype.computeSecret;

/**
 * @param {string=} encoding
 * @return {string|Buffer}
 */
crypto.DiffieHellmanGroup.prototype.getPrime;

/**
 * @param {string=} encoding
 * @return {string|Buffer}
 */
crypto.DiffieHellmanGroup.prototype.getGenerator;

/**
 * @param {string=} encoding
 * @return {string|Buffer}
 */
crypto.DiffieHellmanGroup.prototype.getPublicKey;

/**
 * @param {string} encoding
 * @return {string|Buffer}
 */
crypto.DiffieHellmanGroup.prototype.getPrivateKey = function(encoding) {}

/**
 * @param {string|Buffer} key
 * @param {string=} encoding
 * @return {crypto.DiffieHellmanGroup}
 */
crypto.DiffieHellmanGroup.prototype.setPublicKey;

/**
 * @param {string|Buffer} key
 * @param {string=} encoding
 * @return {crypto.DiffieHellmanGroup}
 */
crypto.DiffieHellmanGroup.prototype.setPrivateKey;

/**
 * @param {string} group_name
 * @return {crypto.DiffieHellmanGroup}
 */
crypto.getDiffieHellman;

/**
 * @param {string|Buffer} password
 * @param {string|Buffer} salt
 * @param {number} iterations
 * @param {number} keylen
 * @param {function(*, string)} callback
 * @return {void}
 */
crypto.pbkdf2;

/**
 * @param {string|Buffer} password
 * @param {string|Buffer} salt
 * @param {number} iterations
 * @param {number} keylen
 * @return {void}
 */
crypto.pbkdf2Sync;

/**
 * @param {number} size
 * @param {function(Error, Buffer)=} callback
 * @return {void}
 */
crypto.randomBytes;

/**
 * @param {number} size
 * @param {function(Error, Buffer)=} callback
 * @return {void}
 */
crypto.pseudoRandomBytes;

/**
 * @param {number} size
 * @param {function(Error, Buffer)=} callback
 * @return {void}
 */
crypto.rng;

/**
 * @param {number} size
 * @param {function(Error, Buffer)=} callback
 * @return {void}
 */
crypto.prng;

/**
 * @return {Array.<string>}
 */
crypto.getCiphers;

/**
 * @return {Array.<string>}
 */
crypto.getHashes;

module.exports = crypto;
