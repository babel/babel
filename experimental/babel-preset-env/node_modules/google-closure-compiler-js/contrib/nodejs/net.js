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
 * @fileoverview Definitions for node's net module. Depends on the events and buffer modules.
 * @see http://nodejs.org/api/net.html
 * @see https://github.com/joyent/node/blob/master/lib/net.js
 */

var events = require('events');

/**
 * @const
 */
var net = {};

/**
 * @typedef {{allowHalfOpen: ?boolean}}
 */
net.CreateOptions;

/**
 * @param {(net.CreateOptions|function(...))=} options
 * @param {function(...)=} connectionListener
 * @return {net.Server}
 */
net.createServer;

/**
 * @typedef {{port: ?number, host: ?string, localAddress: ?string, path: ?string, allowHalfOpen: ?boolean}}
 */
net.ConnectOptions;

/**
 * @param {net.ConnectOptions|number|string} arg1
 * @param {(function(...)|string)=} arg2
 * @param {function(...)=} arg3
 * @return {void}
 */
net.connect;

/**
 * @param {net.ConnectOptions|number|string} arg1
 * @param {(function(...)|string)=} arg2
 * @param {function(...)=} arg3
 * @return {void}
 */
net.createConnection;

/**
 * @constructor
 * @extends events.EventEmitter
 */
net.Server = function() {};

/**
 *
 * @param {number|*} port
 * @param {(string|number|function(...))=} host
 * @param {(number|function(...))=} backlog
 * @param {function(...)=} callback
 * @return {void}
 */
net.Server.prototype.listen;

/**
 * @param {function(...)=} callback
 * @return {void}
 */
net.Server.prototype.close;

/**
 * @return {{port: number, family: string, address: string}}
 */
net.Server.prototype.address;

/**
 * @type {number}
 */
net.Server.prototype.maxConnectinos;

/**
 * @type {number}
 */
net.Server.prototype.connections;

/**
 * @constructor
 * @param {{fd: ?*, type: ?string, allowHalfOpen: ?boolean}=} options
 * @extends events.EventEmitter
 */
net.Socket = function(options) {};

/**
 * @param {number|string|function(...)} port
 * @param {(string|function(...))=} host
 * @param {function(...)=} connectListener
 * @return {void}
 */
net.Socket.prototype.connect;

/**
 * @type {number}
 */
net.Socket.prototype.bufferSize;

/**
 * @param {?string=} encoding
 * @return {void}
 */
net.Socket.prototype.setEncoding;

/**
 * @param {string|Buffer} data
 * @param {(string|function(...))=}encoding
 * @param {function(...)=} callback
 * @return {void}
 */
net.Socket.prototype.write;

/**
 * @param {(string|Buffer)=}data
 * @param {string=} encoding
 * @return {void}
 */
net.Socket.prototype.end;

/**
 * @return {void}
 */
net.Socket.prototype.destroy = function() {};

/**
 * @return {void}
 */
net.Socket.prototype.pause = function() {};

/**
 * @return {void}
 */
net.Socket.prototype.resume;

/**
 * @param {number} timeout
 * @param {function(...)=} callback
 * @return {void}
 */
net.Socket.prototype.setTimeout;

/**
 * @param {boolean=} noDelay
 * @return {void}
 */
net.Socket.prototype.setNoDelay;

/**
 * @param {(boolean|number)=} enable
 * @param {number=} initialDelay
 * @return {void}
 */
net.Socket.prototype.setKeepAlive;

/**
 * @return {string}
 */
net.Socket.prototype.address;

/**
 * @type {?string}
 */
net.Socket.prototype.remoteAddress;

/**
 * @type {?number}
 */
net.Socket.prototype.remotePort;

/**
 * @type {number}
 */
net.Socket.prototype.bytesRead;

/**
 * @type {number}
 */
net.Socket.prototype.bytesWritten;

/**
 * @param {*} input
 * @return {number}
 */
net.isIP;

/**
 * @param {*} input
 * @return {boolean}
 */
net.isIPv4;

/**
 * @param {*} input
 * @return {boolean}
 */
net.isIPv6;

module.exports = net;
