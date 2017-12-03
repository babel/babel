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
 * @fileoverview Definitions for node's assert module
 * @see http://nodejs.org/api/assert.html
 * @see https://github.com/joyent/node/blob/master/lib/assert.js
 */

/**
 * @param {*} value
 * @param {string} message
 * @return {void}
 * @throws {assert.AssertionError}
 */
var assert = function(value, message) {};

/**
 * @param {{message: string, actual: *, expected: *, operator: string}} options
 * @constructor
 * @extends Error
 */
assert.AssertionError = function(options) {};

/**
 * @return {string}
 */
assert.AssertionError.prototype.toString;

/**
 * @param {*} value
 * @param {string=} message
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.ok;

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string} message
 * @param {string} operator
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.fail;

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string} message
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.equal;

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string} message
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.notEqual;

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string} message
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.deepEqual;

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string} message
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.notDeepEqual;

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string} message
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.strictEqual;

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string} message
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.notStrictEqual;

/**
 * @name assert.throws
 * @function
 * @param {function()} block
 * @param {Function|RegExp|function(*)} error
 * @param {string=} message
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.throws;

/**
 * @param {function()} block
 * @param {Function|RegExp|function(*)} error
 * @param {string=} message
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.doesNotThrow;

/**
 * @param {*} value
 * @return {void}
 * @throws {assert.AssertionError}
 */
assert.ifError;

module.exports = assert;
