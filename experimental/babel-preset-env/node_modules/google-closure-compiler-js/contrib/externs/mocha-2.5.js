/*
 * Copyright 2016 The Closure Compiler Authors.
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
 * @fileoverview Externs definitions for Mocha, 2.5 branch.
 *
 * This file currently only defines the TDD API, and that part should be
 * complete.
 *
 * @externs
 * @see https://mochajs.org/
 */

/**
 * @typedef {function(function(*=): *): (*|IThenable<*>)}
 */
var ActionFunction;

// Below are the externs for the TDD API: https://mochajs.org/#tdd

/**
 * @param {string} description
 * @param {function(): void} spec
 */
var suite = function(description, spec) {};

/**
 * @param {!ActionFunction} action
 */
var setup = function(action) {};

/**
 * @param {!ActionFunction} action
 */
var teardown = function(action) {};

/**
 * @param {!ActionFunction} action
 */
var suiteSetup = function(action) {};

/**
 * @param {!ActionFunction} action
 */
var suiteTeardown = function(action) {};

/**
 * @param {string} expectation
 * @param {!ActionFunction=} assertion
 */
var test = function(expectation, assertion) {};

// Below are the externs for the BDD API: https://mochajs.org/#bdd

/**
 * @param {string} description
 * @param {function(): void} spec
 */
var describe = function(description, spec) {};

/**
 * @param {string} description
 * @param {function(): void} spec
 */
var context = function(description, spec) {};

/**
 * @param {string} expectation
 * @param {!ActionFunction=} assertion
 */
var it = function(expectation, assertion) {};

/**
 * @param {string} expectation
 * @param {!ActionFunction=} assertion
 */
var specify = function(expectation, assertion) {};

/**
 * @param {!ActionFunction} action
 */
var before = function(action) {};

/**
 * @param {!ActionFunction} action
 */
var after = function(action) {};

/**
 * @param {!ActionFunction} action
 */
var beforeEach = function(action) {};

/**
 * @param {!ActionFunction} action
 */
var afterEach = function(action) {};
