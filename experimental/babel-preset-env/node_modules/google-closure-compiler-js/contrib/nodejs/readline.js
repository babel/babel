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
 * @fileoverview Definitions for node's readline module. Depends on the events module.
 * @see http://nodejs.org/api/readline.html
 */

var events = require('events');
var stream = require('stream');

/**
 * @const
 */
var readline = {};

/**
 * @param {{input: stream.ReadableStream, output: stream.WritableStream, completer: function(string, function(*, Array)=), terminal: boolean}} options
 * @return {readline.Interface}
 */
readline.createInterface;

/**
 * @constructor
 * @extends events.EventEmitter
 */
readline.Interface = function() {};

/**
 * @param {string} prompt
 * @param {number} length
 * @return {void}
 */
readline.Interface.prototype.setPrompt;

/**
 * @param {boolean=} preserveCursor
 * @return {void}
 */
readline.Interface.prototype.prompt;

/**
 * @param {string} query
 * @param {function(string)} callback
 * @return {void}
 */
readline.Interface.prototype.question;

/**
 * @return {void}
 */
readline.Interface.prototype.pause;

/**
 * @return {void}
 */
readline.Interface.prototype.resume;

/**
 * @return {void}
 */
readline.Interface.prototype.close;

/**
 * @param {string} data
 * @param {Object.<string,*>=} key
 * @return {void}
 */
readline.Interface.prototype.write;

module.exports = readline;
