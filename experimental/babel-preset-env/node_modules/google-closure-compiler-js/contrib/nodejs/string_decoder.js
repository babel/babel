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
 * @fileoverview Definitions for node's string_decoder module. Depends on the buffer module.
 * @see http://nodejs.org/api/string_decoder.html
 * @see https://github.com/joyent/node/blob/master/lib/string_decoder.js
 */

/**
 * @param {string} encoding
 * @constructor
 */
var StringDecoder = function(encoding) {};

/**
 * @param {Buffer} buffer
 * @return {string}
 */
StringDecoder.prototype.write;

/**
 * @return {string}
 */
StringDecoder.prototype.toString;

/**
 * @param {Buffer} buffer
 * @return {number}
 */
StringDecoder.prototype.detectIncompleteChar;

/**
 * @param {Buffer} buffer
 * @return {string}
 */
StringDecoder.prototype.end;

module.exports = StringDecoder;
