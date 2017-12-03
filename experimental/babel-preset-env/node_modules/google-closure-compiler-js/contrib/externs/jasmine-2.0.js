/*
 * Copyright 2015 The Closure Compiler Authors.
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
 * @fileoverview Externs for Jasmine 2.0 (not backwards compatibile with 1.3).
 *
 * TODO: Missing externs for JsApiReporter, real type support for defining
 * matchers.
 *
 * @see http://jasmine.github.io/2.0/introduction.html
 * @externs
 */


/** @const */
var jasmine = {};


/**
 * @param {Object} matchers
 */
jasmine.addMatchers = function(matchers) {};


/**
 * @param {function(?, ?): (boolean|undefined)} tester
 */
jasmine.addCustomEqualityTester = function(tester) {};


/**
 * @return {!jasmine.Clock}
 */
jasmine.clock = function() {};


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
jasmine.Clock = function() {};


/** */
jasmine.Clock.prototype.install = function() {};


/** */
jasmine.Clock.prototype.uninstall = function() {};


/** @param {number} ms */
jasmine.Clock.prototype.tick = function(ms) {};


/** @param {!Date} date */
jasmine.Clock.prototype.mockDate = function(date) {};



/** @constructor @template T */
jasmine.Matchers = function() {};


/** @type {jasmine.Matchers} */
jasmine.Matchers.prototype.not;


/** @type {T} */
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

/** @param {number} num */
jasmine.Matchers.prototype.toHaveBeenCalledTimes = function(num) {};

/** @param {(string|RegExp)} pattern */
jasmine.Matchers.prototype.toMatch = function(pattern) {};


/** @param {Error=} opt_expected */
jasmine.Matchers.prototype.toThrow = function(opt_expected) {};


/**
 * @param {(!Function|string|!RegExp)} errorTypeOrMessageOrPattern
 * @param {(string|RegExp)=} opt_messageOrPattern
 */
jasmine.Matchers.prototype.toThrowError = function(
    errorTypeOrMessageOrPattern, opt_messageOrPattern) {};


/**
 * @param {!Object} clazz
 * @return {!jasmine.Matchers}
 */
jasmine.any = function(clazz) {};

/**
 * @return {!jasmine.Matchers}
 */
jasmine.anything = function() {};

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
 * @constructor
 * @extends {Function}
 */
jasmine.Spy = function() {};


/** @type {!jasmine.SpyStrategy} */
jasmine.Spy.prototype.and;


/**
 * @return {void}
 */
jasmine.Spy.prototype.reset = function() {};


/** @type {!jasmine.CallTracker} */
jasmine.Spy.prototype.calls;



/**
 * @constructor
 */
jasmine.CallTracker = function() {};


/**
 * @return {boolean}
 */
jasmine.CallTracker.prototype.any = function() {};


/**
 * @return {number}
 */
jasmine.CallTracker.prototype.count = function() {};


/**
 * @param {number} index
 * @return {!Array}
 */
jasmine.CallTracker.prototype.argsFor = function(index) {};


/**
 * @return {!Array.<{args: !Array, object: Object}>}
 */
jasmine.CallTracker.prototype.allArgs = function() {};


/**
 * @return {{args: !Array, object: Object}}
 */
jasmine.CallTracker.prototype.mostRecent = function() {};


/**
 * @return {!{args: !Array, object: Object}}
 */
jasmine.CallTracker.prototype.first = function() {};


/** @return {void} */
jasmine.CallTracker.prototype.reset = function() {};



/**
 * @constructor
 */
jasmine.SpyStrategy = function() {};


/** @return {!jasmine.Spy} */
jasmine.SpyStrategy.prototype.callThrough = function() {};


/**
 * @param {*} value
 * @return {!jasmine.Spy}
 */
jasmine.SpyStrategy.prototype.returnValue = function(value) {};


/**
 * @param {...*} var_args
 * @return {!jasmine.Spy}
 */
jasmine.SpyStrategy.prototype.returnValues = function(var_args) {};


/**
 * @param {*} error
 * @return {!jasmine.Spy}
 */
jasmine.SpyStrategy.prototype.throwError = function(error) {};


/**
 * @param {Function} fn
 * @return {!jasmine.Spy}
 */
jasmine.SpyStrategy.prototype.callFake = function(fn) {};


/** @return {!jasmine.Spy} */
jasmine.SpyStrategy.prototype.stub = function() {};



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
 * @param {function(this:jasmine.Spec)} beforeAllFunction
 */
jasmine.Suite.prototype.beforeAll = function(beforeAllFunction) {};


/**
 * @param {function(this:jasmine.Spec)} afterEachFunction
 */
jasmine.Suite.prototype.afterEach = function(afterEachFunction) {};


/**
 * @param {function(this:jasmine.Spec)} afterAllFunction
 */
jasmine.Suite.prototype.afterAll = function(afterAllFunction) {};



/** @constructor */
jasmine.Env = function() {};


/** @type {jasmine.Spec} */
jasmine.Env.prototype.currentSpec;


/** @return {void} */
jasmine.Env.prototype.execute = function() {};


/** @param {function(this:jasmine.Spec)} handler */
jasmine.Env.prototype.beforeEach = function(handler) {};


/** @param {function(this:jasmine.Spec)} handler */
jasmine.Env.prototype.beforeAll = function(handler) {};


/** @param {function(this:jasmine.Spec)} handler */
jasmine.Env.prototype.afterEach = function(handler) {};


/** @param {function(this:jasmine.Spec)} handler */
jasmine.Env.prototype.afterAll = function(handler) {};


/**
 * @return {!jasmine.Env}
 */
jasmine.getEnv = function() {};


/** @param {function(this:jasmine.Spec, function())} handler */
function beforeEach(handler) {}


/** @param {function(this:jasmine.Spec, function())} handler */
function beforeAll(handler) {}


/** @param {function(this:jasmine.Spec, function())} handler */
function afterEach(handler) {}


/** @param {function(this:jasmine.Spec, function())} handler */
function afterAll(handler) {}


/**
 * @param {string} description
 * @param {function(this:jasmine.Suite)} handler
 */
function describe(description, handler) {}


/**
 * @param {string} description
 * @param {function(this:jasmine.Suite)} handler
 */
function fdescribe(description, handler) {}


/**
 * @param {*} expectedValue
 * @return {jasmine.Matchers} matcher
 */
function expect(expectedValue) {}

/** @typedef {function()} */
var DoneFunc;

/** @type {DoneFunc} */
var doneFuncInst_;
/** @type {function(?=)} */
doneFuncInst_.fail;

/**
 * @param {string} description
 * @param {function(this:jasmine.Spec, DoneFunc)} handler
 */
function it(description, handler) {}


/**
 * @param {string} description
 * @param {function(this:jasmine.Spec, DoneFunc)} handler
 */
function fit(description, handler) {}


/**
 * @param {string} description
 * @param {function(this:jasmine.Spec, function())} handler
 */
function pending(description, handler) {}


/**
 * @param {Object} spiedOnObject
 * @param {string} methodName
 * @return {!jasmine.Spy} spy
 */
function spyOn(spiedOnObject, methodName) {}


/**
 * @nosideeffects
 * @param {string} description
 * @param {function(this:jasmine.Suite)} handler
 */
function xdescribe(description, handler) {}


/**
 * @param {string} description
 * @param {function(this:jasmine.Spec, DoneFunc)} handler
 */
function xit(description, handler) {}


/**
 * @type {jasmine.Spec}
 */
var currentSpec;
