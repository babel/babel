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
 * @fileoverview Definitions for node's "events" module.
 * @see http://nodejs.org/api/events.html
 * @see https://github.com/joyent/node/blob/master/lib/events.js
 */

/**
 * @const
 */
var events = {};

/**
 * @constructor
 */
events.EventEmitter = function() {};

/**
 * @param {string} event
 * @param {function(...)} listener
 * @return {events.EventEmitter}
 */
events.EventEmitter.prototype.addListener;

/**
 * @param {string} event
 * @param {function(...)} listener
 * @return {events.EventEmitter}
 */
events.EventEmitter.prototype.on;

/**
 * @param {string} event
 * @param {function(...)} listener
 * @return {events.EventEmitter}
 */
events.EventEmitter.prototype.once;

/**
 * @param {string} event
 * @param {function(...)} listener
 * @return {events.EventEmitter}
 */
events.EventEmitter.prototype.removeListener;

/**
 * @param {string=} event
 * @return {events.EventEmitter}
 */
events.EventEmitter.prototype.removeAllListeners;

/**
 * @param {number} n
 * @return {void}
 */
events.EventEmitter.prototype.setMaxListeners;

/**
 * @param {string} event
 * @return {Array.<function(...)>}
 */
events.EventEmitter.prototype.listeners;

/**
 * @param {string} event
 * @param {...*} var_args
 * @return {boolean}
 */
events.EventEmitter.prototype.emit;

// Undocumented

/**
 * @type {boolean}
 */
events.usingDomains;

/**
 * @param {events.EventEmitter} emitter
 * @param {string} type
 * @return {void}
 */
events.EventEmitter.listenerCount;

module.exports = events;
