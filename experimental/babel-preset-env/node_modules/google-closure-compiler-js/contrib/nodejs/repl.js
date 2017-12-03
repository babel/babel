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
 * @fileoverview Definitions for node's repl module. Depends on the events and stream modules.
 * @see http://nodejs.org/api/repl.html
 * @see https://github.com/joyent/node/blob/master/lib/repl.js
 */

var events = require('events');
var stream = require('stream');

/**
 * @const
 */
var repl = {};

/**
 * @param {{prompt: ?string, input: ?stream.Readable, output: ?stream.Writable, terminal: ?boolean, eval: ?function(string), useColors: ?boolean, useGlobal: ?boolean, ignoreUndefined: ?boolean, writer: ?function(string)}} options
 * @return {repl.REPLServer}
 */
repl.start;

/**
 * @constructor
 * @extends events.EventEmitter
 */
repl.REPLServer = function() {};

/**
 * @type {Object.<string,*>}
 */
repl.REPLServer.prototype.context;

module.exports = repl;
