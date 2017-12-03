/*
 * Copyright 2013 The Closure Compiler Authors.
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
 * @fileoverview Externs for Jasmine.
 *
 * TODO: Remaining Spy properties and anything else missing.
 *
 * @see http://pivotal.github.com/jasmine/
 * @externs
 */


/** @const */
var jasmine = {};


/**
 * @param {string} name
 * @return {!jasmine.Spy} spy
 */
jasmine.createSpy = function(name) {};


/**
 * @param {string} baseName
 * @param {Array} methodNames
 */
jasmine.createSpyObj = function(baseName, methodNames) {};


/** @constructor */
jasmine.TimeProvider = function() {};


/**
 * @param {Function} cb
 * @param {number} time
 * @return {number}
 */
jasmine.TimeProvider.prototype.setTimeout = function(cb, time) {};


/**
 * @param {Function} cb
 * @param {number} time
 * @return {number}
 */
jasmine.TimeProvider.prototype.setInterval = function(cb, time) {};


/**
 * @param {number} id
 */
jasmine.TimeProvider.prototype.clearTimeout = function(id) {};


/**
 * @param {number} id
 */
jasmine.TimeProvider.prototype.clearInterval = function(id) {};


/**
 * @type {number}
 */
jasmine.TimeProvider.prototype.nowMillis;


/** @constructor */
jasmine.Clock = function() {};


/** @type {!jasmine.TimeProvider} */
jasmine.Clock.real;


/** @type {!jasmine.TimeProvider} */
jasmine.Clock.installed;


/** @return {void} */
jasmine.Clock.useMock = function() {};


/** @param {number} ms */
jasmine.Clock.tick = function(ms) {};


/** @type {number} */
jasmine.Clock.prototype.nowMillis;


/** @constructor */
jasmine.Matchers = function() {};


/** @type {jasmine.Matchers} */
jasmine.Matchers.prototype.not;


/** @type {*} */
jasmine.Matchers.prototype.actual;


/** @param {*} value */
jasmine.Matchers.prototype.toBe = function(value) {};


/** @return {void} */
jasmine.Matchers.prototype.toBeDefined = function() {};


/** @return {void} */
jasmine.Matchers.prototype.toBeFalsy = function() {};


/** @param {*} value */
jasmine.Matchers.prototype.toBeGreaterThan = function(value) {};


/** @param {*} value */
jasmine.Matchers.prototype.toBeLessThan = function(value) {};


/** @param {*} value */
jasmine.Matchers.prototype.toBeCloseTo = function(value, precision) {};


/** @return {void} */
jasmine.Matchers.prototype.toBeNull = function() {};


/** @return {void} */
jasmine.Matchers.prototype.toBeTruthy = function() {};


/** @return {void} */
jasmine.Matchers.prototype.toBeUndefined = function() {};


/** @return {void} */
jasmine.Matchers.prototype.toBeNaN = function() {};


/** @param {*} value */
jasmine.Matchers.prototype.toContain = function(value) {};


/** @param {*} value */
jasmine.Matchers.prototype.toEqual = function(value) {};


/** @return {void} */
jasmine.Matchers.prototype.toHaveBeenCalled = function() {};


/** @param {...*} var_args */
jasmine.Matchers.prototype.toHaveBeenCalledWith = function(var_args) {};


/** @param {(string|RegExp)} pattern */
jasmine.Matchers.prototype.toMatch = function(pattern) {};


/** @param {Error=} opt_expected */
jasmine.Matchers.prototype.toThrow = function(opt_expected) {};


/**
 * @param {Object} value
 * @return {string}
 */
jasmine.pp = function(value) {};


/**
 * @param {!Object} clazz
 * @return {!jasmine.Matchers}
 */
jasmine.any = function(clazz) {};


/**
 * @param {!Object} sample
 * @return {!jasmine.Matchers}
 */
jasmine.objectContaining = function(sample) {};


/** @constructor */
jasmine.Spec = function() {};


/** @type {undefined|function(): string} */
jasmine.Spec.prototype.message;


/**
 * @param {function(this:jasmine.Spec)} after
 */
jasmine.Spec.prototype.after = function(after) {};


/** @param {Error|string} e */
jasmine.Spec.prototype.fail = function(e) {};


/**
 * @param {function()=} opt_onComplete
 */
jasmine.Spec.prototype.finish = function(opt_onComplete) {};

/**
 * @param {Object} matchers
 */
jasmine.Spec.prototype.addMatchers = function(matchers) {};


/**
 * @constructor
 * @extends {Function}
 */
jasmine.Spy = function() {};


/**
 * @param {!Function} fn
 * @return {!jasmine.Spy}
 */
jasmine.Spy.prototype.andCallFake = function(fn) {};


/** @return {!jasmine.Spy} */
jasmine.Spy.prototype.andCallThrough = function() {};


/**
 * @param {*} value
 * @return {!jasmine.Spy}
 */
jasmine.Spy.prototype.andReturn = function(value) {};


/**
 * @param {!Error} exception
 * @return {!jasmine.Spy}
 */
jasmine.Spy.prototype.andThrow = function(exception) {};


/**
 * @return {void}
 */
jasmine.Spy.prototype.reset = function() {};


/** @type {number} */
jasmine.Spy.prototype.callCount;


/** @type {!Array.<!Object>} */
jasmine.Spy.prototype.calls;


/** @type {*} */
jasmine.Spy.prototype.mostRecentCall;


/** @type {!Array} */
jasmine.Spy.prototype.mostRecentCall.args;


/** @constructor */
jasmine.Suite = function() {};


/**
 * @param {function()=} opt_onComplete
 */
jasmine.Suite.prototype.finish = function(opt_onComplete) {};

/**
 * @param {function(this:jasmine.Spec)} beforeEachFunction
 */
jasmine.Suite.prototype.beforeEach = function(beforeEachFunction) {};

/**
 * @param {function(this:jasmine.Spec)} afterEachFunction
 */
jasmine.Suite.prototype.afterEach = function(afterEachFunction) {};


/** @constructor */
jasmine.JsApiReporter = function() {};


/** @type {!Array.<string>} */
jasmine.JsApiReporter.prototype.messages;


/** @type {boolean} */
jasmine.JsApiReporter.prototype.finished;


/** @return {!Array.<{id:string,name:string,type:string,children:!Array}>} id */
jasmine.JsApiReporter.prototype.suites = function() {};


/** @return {boolean} */
jasmine.JsApiReporter.prototype.isInitialized = function() {};


/** @return {boolean} */
jasmine.JsApiReporter.prototype.isFinished = function() {};


/** @return {boolean} */
jasmine.JsApiReporter.prototype.isSuccess = function() {};


/** @return {string} */
jasmine.JsApiReporter.prototype.getReport = function() {};


/** @return {number} */
jasmine.JsApiReporter.prototype.getRunTime = function() {};


/** @param {Object} runner */
jasmine.JsApiReporter.prototype.reportRunnerStarting = function(runner) {};


/** @return {Object} runner */
jasmine.JsApiReporter.prototype.reportRunnerResults = function(runner) {};


/**
 * @param {string} id
 * @return {{messages:Array,result:string}}
 */
jasmine.JsApiReporter.prototype.resultsForSpec = function(id) {};


/** @constructor */
jasmine.Env = function() {};


/** @type {jasmine.Spec} */
jasmine.Env.prototype.currentSpec;


/** @return {void} */
jasmine.Env.prototype.execute = function() {};


/** @param {jasmine.JsApiReporter} reporter */
jasmine.Env.prototype.addReporter = function(reporter) {};


/** @param {function(this:jasmine.Spec)} handler */
jasmine.Env.prototype.afterEach = function(handler) {};


/** @param {function(this:jasmine.Spec)} handler */
jasmine.Env.prototype.beforeEach = function(handler) {};


/**
 * @return {!jasmine.Env}
 */
jasmine.getEnv = function() {};


/** @param {function(this:jasmine.Spec)} handler */
function afterEach(handler) {}


/** @param {function(this:jasmine.Spec)} handler */
function beforeEach(handler) {}


/**
 * @param {string} description
 * @param {function(this:jasmine.Suite)} handler
 */
function describe(description, handler) {}


/**
 * @param {*} expectedValue
 * @return {jasmine.Matchers} matcher
 */
function expect(expectedValue) {}


/**
 * Provided by angular-mocks.js.
 * @param {...(Function|Array<string|Function>)} var_args
 */
function inject(var_args) {}


/**
 * @param {string} description
 * @param {function(this:jasmine.Spec)} handler
 */
function it(description, handler) {}


/**
 * @param {string} description
 * @param {function(this:jasmine.Spec)} handler
 */
function iit(description, handler) {}


/**
 * Provided by angular-mocks.js.
 * @param {...(string|Function|Array<string|Function>)} var_args
 * @suppress {checkTypes}
 */
function module(var_args) {}


/** @param {function()} handler */
function runs(handler) {}


/**
 * @param {Object} spiedOnObject
 * @param {string} methodName
 * @return {jasmine.Spy} spy
 */
function spyOn(spiedOnObject, methodName) {}


/** @param {number} timeout */
function waits(timeout) {}


/**
 * @param {function(): boolean} handler
 * @param {string=} opt_message
 * @param {number=} opt_timeout
 */
function waitsFor(handler, opt_message, opt_timeout) {}


/**
 * @nosideeffects
 * @param {string} description
 * @param {function(this:jasmine.Suite)} handler
 */
function xdescribe(description, handler) {}


/**
 * @param {string} description
 * @param {function(this:jasmine.Spec)} handler
 */
function xit(description, handler) {}
