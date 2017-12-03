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
 * @fileoverview Definitions for node's dgram module. Depends on the events module.
 * @see http://nodejs.org/api/dgram.html
 * @see https://github.com/joyent/node/blob/master/lib/dgram.js
 */

var events = require('events');

/**
 * @const
 */
var dgram = {};

/**
 * @param {string} type
 * @param {function(...)=} callback
 * @return {dgram.Socket}
 */
dgram.createSocket;

/**
 * @constructor
 * @extends events.EventEmitter
 */
dgram.Socket = function() {};

/**
 * @param {Buffer} buf
 * @param {number} offset
 * @param {number} length
 * @param {number} port
 * @param {string} address
 * @param {function(...)=} callback
 * @return {void}
 */
dgram.Socket.prototype.send;

/**
 * @param {number} port
 * @param {string=} address
 * @return {void}
 */
dgram.Socket.prototype.bind;

/**
 * @return {void}
 */
dgram.Socket.prototype.close;

/**
 * @return {string}
 */
dgram.Socket.prototype.address;

/**
 * @param {boolean} flag
 * @return {void}
 */
dgram.Socket.prototype.setBroadcast;

/**
 * @param {number} ttl
 * @return {number}
 */
dgram.Socket.prototype.setTTL;

/**
 * @param {number} ttl
 * @return {number}
 */
dgram.Socket.prototype.setMulticastTTL;

/**
 * @param {boolean} flag
 * @return {void}
 */
dgram.Socket.prototype.setMulticastLoopback;

/**
 * @param {string} multicastAddress
 * @param {string=} multicastInterface
 * @return {void}
 */
dgram.Socket.prototype.addMembership;

/**
 * @param {string} multicastAddress
 * @param {string=} multicastInterface
 * @return {void}
 */
dgram.Socket.prototype.dropMembership;

module.exports = dgram;
