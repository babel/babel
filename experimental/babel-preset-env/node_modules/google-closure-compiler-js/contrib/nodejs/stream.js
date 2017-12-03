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
 * @fileoverview Definitions for node's stream module. Depends on the events module.
 * @see http://nodejs.org/api/stream.html
 * @see https://github.com/joyent/node/blob/master/lib/stream.js
 */

var events = require('events');

/** @const */
var stream = {};

/**
 * @constructor
 * @param {Object=} options
 * @extends events.EventEmitter
 */
stream.Stream = function(options) {};

/**
 * @param {stream.Writable} dest
 * @param {{end: boolean}=} pipeOpts
 * @return {stream.Writable}
 */
stream.Stream.prototype.pipe;

/**
 * @constructor
 * @param {Object=} options
 * @extends stream.Stream
 */
stream.Readable = function(options) {};

/**
 * @type {boolean}
 * @deprecated
 */
stream.Readable.prototype.readable;

/**
 * @protected
 * @param {string|Buffer|null} chunk
 * @return {boolean}
 */
stream.Readable.prototype.push;

/**
 * @param {string|Buffer|null} chunk
 * @return {boolean}
 */
stream.Readable.prototype.unshift;

/**
 * @param {string} enc
 * @return {void}
 */
stream.Readable.prototype.setEncoding;

/**
 * @param {number=} n
 * @return {Buffer|string|null}
 */
stream.Readable.prototype.read;

/**
 * @protected
 * @param {number} n
 * @return {void}
 */
stream.Readable.prototype._read;

/**
 * @param {stream.Writable=} dest
 * @return {stream.Readable}
 */
stream.Readable.prototype.unpipe;

/**
 * @return {void}
 */
stream.Readable.prototype.resume;

/**
 * @return {void}
 */
stream.Readable.prototype.pause;

/**
 * @param {stream.Stream} stream
 * @return {stream.Readable}
 */
stream.Readable.prototype.wrap;

/**
 * @constructor
 * @extends stream.Readable
 */
stream.ReadableStream = function() {};

/**
 * @type {boolean}
 */
stream.ReadableStream.prototype.readable;

/**
 * @param {string=} encoding
 * @return {void}
 */
stream.ReadableStream.prototype.setEncoding;

/**
 * @return {void}
 */
stream.ReadableStream.prototype.destroy;

/**
 * @constructor
 * @param {Object=} options
 * @extends stream.Stream
 */
stream.Writable = function(options) {};

/**
 * @deprecated
 * @type {boolean}
 */
stream.Writable.prototype.writable;

/**
 * @param {string|Buffer} chunk
 * @param {string=} encoding
 * @param {function(*=)=} cb
 * @return {boolean}
 */
stream.Writable.prototype.write;

/**
 * @protected
 * @param {string|Buffer} chunk
 * @param {string} encoding
 * @param {function(*=)} cb
 * @return {void}
 */
stream.Writable.prototype._write;

/**
 * @param {string|Buffer=} chunk
 * @param {string=} encoding
 * @param {function(*=)=} cb
 * @return {void}
 */
stream.Writable.prototype.end;

/**
 * @constructor
 * @extends stream.Writable
 */
stream.WritableStream = function() {};

/**
 * @return {void}
 */
stream.WritableStream.prototype.drain;

/**
 * @type {boolean}
 */
stream.WritableStream.prototype.writable;

/**
 * @param {string|Buffer} buffer
 * @param {string=} encoding
 * @return {void}
 */
stream.WritableStream.prototype.write;

/**
 * @param {string|Buffer=} buffer
 * @param {string=} encoding
 * @param {function(*=)=} cb
 * @return {void}
 */
stream.WritableStream.prototype.end;

/**
 * @return {void}
 */
stream.WritableStream.prototype.destroy;

/**
 * @return {void}
 */
stream.WritableStream.prototype.destroySoon;

/**
 * @constructor
 * @param {Object=} options
 * @extends stream.Readable
 * Xextends stream.Writable
 */
stream.Duplex = function(options) {};

/**
 * @type {boolean}
 */
stream.Duplex.prototype.allowHalfOpen;


/**
 * @param {Object=} options
 * @constructor
 * @extends stream.Duplex
 */
stream.Transform = function(options) {};

/**
 * @protected
 * @param {string|Buffer} chunk
 * @param {string} encoding
 * @param {function(*=)} cb
 * @return {void}
 */
stream.Transform._transform;

/**
 * @protected
 * @param {function(*=)} cb
 * @return {void}
 */
stream.Transform._flush;

/**
 * @param {Object=} options
 * @constructor
 * @extends stream.Transform
 */
stream.PassThrough = function(options) {};

module.exports = stream;
