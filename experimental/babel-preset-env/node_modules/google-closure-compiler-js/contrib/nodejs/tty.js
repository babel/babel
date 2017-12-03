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
 * @fileoverview Definitions for node's tty module. Depends on the net module.
 * @see http://nodejs.org/api/tty.html
 * @see https://github.com/joyent/node/blob/master/lib/tty.js
 */

var net = require('net');

/**
 * @const
 */
var tty = {};

/**
 * @param {*} fd
 * @return {boolean}
 */
tty.isatty;

/**
 * @param {boolean} mode
 * @return {void}
 */
tty.setRawMode;

/**
 * @constructor
 * @extends net.Socket
 */
tty.ReadStream = function() {};

/**
 * @type {boolean}
 */
tty.ReadStream.prototype.isRaw;

/**
 * @param {boolean} mode
 * @return {void}
 */
tty.ReadStream.prototype.setRawMode;

/**
 * @constructor
 * @extends net.Socket
 */
tty.WriteStream = function() {};

/**
 * @type {number}
 */
tty.WriteStream.prototype.columns;

/**
 * @type {number}
 */
tty.WriteStream.prototype.rows;

module.exports = tty;
