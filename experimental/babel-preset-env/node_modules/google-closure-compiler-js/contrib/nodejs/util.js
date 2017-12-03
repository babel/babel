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
 * @fileoverview Definitions for node's util module. Depends on the stream module.
 * @see http://nodejs.org/api/util.html
 * @see https://github.com/joyent/node/blob/master/lib/util.js
 */

/**
 * @const
 */
var util = {};

/**
 * @param {string} format
 * @param {...*} var_args
 * @return {string}
 * @nosideeffects
 */
util.format;

/**
 * @param {string} string
 * @return {void}
 */
util.debug;

/**
 * @param {...*} var_args
 * @return {void}
 */
util.error;

/**
 * @param {...*} var_args
 * @return {void}
 */
util.puts;

/**
 * @param {...*} var_args
 * @return {void}
 */
util.print;

/**
 * @param {string} string
 * @return {void}
 */
util.log;

/**
 * @param {*} object
 * @param {{showHidden: (boolean|undefined),
 *          depth: (number|null|undefined),
 *          colors: (boolean|undefined),
 *          customInspect: (boolean|undefined)}=} options
 * @return {string}
 * @nosideeffects
 */
util.inspect;

/**
 * @param {*} object
 * @return {boolean}
 * @nosideeffects
 */
util.isArray;

/**
 * @param {*} object
 * @return {boolean}
 * @nosideeffects
 */
util.isRegExp;

/**
 * @param {*} object
 * @return {boolean}
 * @nosideeffects
 */
util.isDate;

/**
 * @param {*} object
 * @return {boolean}
 * @nosideeffects
 */
util.isError;

/**
 * @param {Function} constructor
 * @param {Function} superConstructor
 * @return {void}
 */
util.inherits;

module.exports = util;
