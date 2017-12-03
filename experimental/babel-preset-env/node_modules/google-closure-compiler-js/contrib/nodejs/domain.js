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
 * @fileoverview Definitions for node's domain module. Depends on the events module.
 * @see http://nodejs.org/api/domain.html
 * @see https://github.com/joyent/node/blob/master/lib/domain.js
 */

var events = require('events');

/**
 * @const
 */
var domain = {};

/**
 * @type {domain.Domain}
 */
domain.active;

/**
 * @return {domain.Domain}
 */
domain.create;

/**
 * @constructor
 * @extends events.EventEmitter
 */
domain.Domain = function () {};

/**
 * @param {function()} fn
 */
domain.Domain.prototype.run;

/**
 * @type {Array}
 */
domain.Domain.prototype.members;

/**
 * @param {events.EventEmitter} emitter
 * @return {void}
 */
domain.Domain.prototype.add;

/**
 * @param {events.EventEmitter} emitter
 * @return {void}
 */
domain.Domain.prototype.remove;

/**
 * @param {function(...*)} callback
 * @return {function(...*)}
 */
domain.Domain.prototype.bind;

/**
 * @param {function(...*)} callback
 * @return {function(...*)}
 */
domain.Domain.prototype.intercept;

/**
 * @return {void}
 */
domain.Domain.prototype.dispose;

// Undocumented

/**
 * @return {void}
 */
domain.Domain.prototype.enter;

/**
 * @return {void}
 */
domain.Domain.prototype.exit;

module.exports = domain;
