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
 * @fileoverview Externs definitions for the Sinon library, 1.17 branch.
 *
 * Note that this file is incomplete.
 *
 * This file defines some virtual types, please don't use these directly, but
 * follow the official API guidelines.
 *
 * @externs
 * @see http://sinonjs.org/docs/
 */

/** @const */
var sinon = {};



/**
 * @constructor
 * @implements {EventListener}
 * @extends {Function}
 */
var SinonSpyCallApi = function() {};

/**
 * NOTE: This function doesn't exist on the sinon spy, it exists to be able to
 * satisfy the EventListener interface so that the spy can be used with
 * addEventListener calls.
 *
 * @param {!Event} event
 * @override
 * @deprecated This function doesn't exist on the sinon spy.
 */
SinonSpyCallApi.prototype.handleEvent = function(event) {};


/** @type {*} */
SinonSpyCallApi.prototype.thisValue;

/** @type {!Array<*>} */
SinonSpyCallApi.prototype.args;

/** @type {*} */
SinonSpyCallApi.prototype.exception;

/** @type {*} */
SinonSpyCallApi.prototype.returnValue;

/**
 * @param {*} obj
 * @return {boolean}
 */
SinonSpyCallApi.prototype.calledOn = function(obj) {};

/**
 * @param {...*} args
 * @return {boolean}
 */
SinonSpyCallApi.prototype.calledWith = function(args) {};

/**
 * @param {...*} args
 * @return {boolean}
 */
SinonSpyCallApi.prototype.calledWithExactly = function(args) {};

/**
 * @param {...*} args
 * @return {boolean}
 */
SinonSpyCallApi.prototype.calledWithMatch = function(args) {};

/**
 * @param {...*} args
 * @return {boolean}
 */
SinonSpyCallApi.prototype.notCalledWith = function(args) {};

/**
 * @param {...*} args
 * @return {boolean}
 */
SinonSpyCallApi.prototype.notCalledWithMatch = function(args) {};

/**
 * @param {*} value
 * @return {boolean}
 */
SinonSpyCallApi.prototype.returned = function(value) {};

/**
 * @param {*=} obj
 * @return {boolean}
 */
SinonSpyCallApi.prototype.threw = function(obj) {};

/**
 * @param {number} pos
 */
SinonSpyCallApi.prototype.callArg = function(pos) {};

/**
 * @param {number} pos
 * @param {*} obj
 * @param {...*} args
 */
SinonSpyCallApi.prototype.callArgOn = function(pos, obj, args) {};

/**
 * @param {number} pos
 * @param {...*} args
 */
SinonSpyCallApi.prototype.callArgWith = function(pos, args) {};

/**
 * @param {number} pos
 * @param {*} obj
 * @param {...*} args
 */
SinonSpyCallApi.prototype.callArgOnWith = function(pos, obj, args) {};

/**
 * @param {...*} args
 */
SinonSpyCallApi.prototype.yield = function(args) {};

/**
 * @param {*} obj
 * @param {...*} args
 */
SinonSpyCallApi.prototype.yieldOn = function(obj, args) {};

/**
 * @param {string} property
 * @param {...*} args
 */
SinonSpyCallApi.prototype.yieldTo = function(property, args) {};

/**
 * @param {string} property
 * @param {*} obj
 * @param {...*} args
 */
SinonSpyCallApi.prototype.yieldToOn = function(property, obj, args) {};



/**
 * @constructor
 * @extends {SinonSpyCallApi}
 */
var SinonSpyCall = function() {};

/**
 * @param {!SinonSpyCall} call
 * @return {boolean}
 */
SinonSpyCall.prototype.calledBefore = function(call) {};

/**
 * @param {!SinonSpyCall} call
 * @return {boolean}
 */
SinonSpyCall.prototype.calledAfter = function(call) {};

/**
 * @param {!SinonSpyCall} call
 * @return {boolean}
 */
SinonSpyCall.prototype.calledWithNew = function(call) {};



/**
 * @constructor
 * @extends {SinonSpyCallApi}
 */
var SinonSpy = function() {};

/** @type {number} */
SinonSpy.prototype.callCount;

/** @type {boolean} */
SinonSpy.prototype.called;

/** @type {boolean} */
SinonSpy.prototype.notCalled;

/** @type {boolean} */
SinonSpy.prototype.calledOnce;

/** @type {boolean} */
SinonSpy.prototype.calledTwice;

/** @type {boolean} */
SinonSpy.prototype.calledThrice;

/** @type {!SinonSpyCall} */
SinonSpy.prototype.firstCall;

/** @type {!SinonSpyCall} */
SinonSpy.prototype.secondCall;

/** @type {!SinonSpyCall} */
SinonSpy.prototype.thirdCall;

/** @type {!SinonSpyCall} */
SinonSpy.prototype.lastCall;

/** @type {!Array<*>} */
SinonSpy.prototype.thisValues;

/** @type {!Array<!Array<*>>} */
SinonSpy.prototype.args;

/** @type {!Array<*>} */
SinonSpy.prototype.exceptions;

/** @type {!Array<*>} */
SinonSpy.prototype.returnValues;

/**
 * @param {!SinonSpy} anotherSpy
 * @return {boolean}
 */
SinonSpy.prototype.calledBefore = function(anotherSpy) {};

/**
 * @param {!SinonSpy} anotherSpy
 * @return {boolean}
 */
SinonSpy.prototype.calledAfter = function(anotherSpy) {};

/**
 * @return {boolean}
 */
SinonSpy.prototype.calledWithNew = function() {};

/**
 * @param {...*} args
 * @return {!SinonSpy}
 */
SinonSpy.prototype.withArgs = function(args) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
SinonSpy.prototype.alwaysCalledOn = function(obj) {};

/**
 * @param {...*} args
 * @return {boolean}
 */
SinonSpy.prototype.alwaysCalledWith = function(args) {};

/**
 * @param {...*} args
 * @return {boolean}
 */
SinonSpy.prototype.alwaysCalledWithExactly = function(args) {};

/**
 * @param {...*} args
 * @return {boolean}
 */
SinonSpy.prototype.alwaysCalledWithMatch = function(args) {};

/**
 * @param {...*} args
 * @return {boolean}
 */
SinonSpy.prototype.neverCalledWith = function(args) {};

/**
 * @param {...*} args
 * @return {boolean}
 */
SinonSpy.prototype.neverCalledWithMatch = function(args) {};

/**
 * @param {*=} obj
 * @return {boolean}
 */
SinonSpy.prototype.alwaysThrew = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
SinonSpy.prototype.alwaysReturned = function(obj) {};

/**
 * @param {...*} args
 */
SinonSpy.prototype.invokeCallback = function(args) {};

/**
 * @param {number} n
 * @return {!SinonSpyCall}
 */
SinonSpy.prototype.getCall = function(n) {};

SinonSpy.prototype.reset = function() {};

/**
 * @param {string} format
 * @param {...*} args
 * @return {string}
 */
SinonSpy.prototype.printf = function(format, args) {};

SinonSpy.prototype.restore = function() {};



/**
 * @param {*=} objectOrFunction
 * @param {string=} method
 * @return {!SinonSpy}
 */
sinon.spy = function(objectOrFunction, method) {};



/**
 * @constructor
 * @extends {SinonSpy}
 */
var SinonStub = function() {};

SinonStub.prototype.resetBehavior = function() {};

/**
 * @param {*} obj
 * @return {!SinonStub}
 */
SinonStub.prototype.returns = function(obj) {};

/**
 * @param {number} index
 * @return {!SinonStub}
 */
SinonStub.prototype.returnsArg = function(index) {};

/**
 * @return {!SinonStub}
 */
SinonStub.prototype.returnsThis = function() {};

/**
 * @param {*=} obj
 * @return {!SinonStub}
 */
SinonStub.prototype.throws = function(obj) {};

/**
 * @param {number} index
 * @return {!SinonStub}
 */
SinonStub.prototype.callsArg = function(index) {};

/**
 * @param {number} index
 * @param {*} context
 * @return {!SinonStub}
 */
SinonStub.prototype.callsArgOn = function(index, context) {};

/**
 * @param {number} index
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.callsArgWith = function(index, args) {};

/**
 * @param {number} index
 * @param {*} context
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.callsArgOnWith = function(index, context, args) {};

/**
 * @param {number} index
 * @return {!SinonStub}
 */
SinonStub.prototype.callsArgAsync = function(index) {};

/**
 * @param {number} index
 * @param {*} context
 * @return {!SinonStub}
 */
SinonStub.prototype.callsArgOnAsync = function(index, context) {};

/**
 * @param {number} index
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.callsArgWithAsync = function(index, args) {};

/**
 * @param {number} index
 * @param {*} context
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.callsArgOnWithAsync = function(index, context, args) {};

/**
 * @param {number} n
 * @return {!SinonStub}
 */
SinonStub.prototype.onCall = function(n) {};

/**
 * @return {!SinonStub}
 */
SinonStub.prototype.onFirstCall = function() {};

/**
 * @return {!SinonStub}
 */
SinonStub.prototype.onSecondCall = function() {};

/**
 * @return {!SinonStub}
 */
SinonStub.prototype.onThirdCall = function() {};

/**
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.yields = function(args) {};

/**
 * @param {*} context
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.yieldsOn = function(context, args) {};

/**
 * @param {string} property
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.yieldsTo = function(property, args) {};

/**
 * @param {string} property
 * @param {*} context
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.yieldsToOn = function(property, context, args) {};

/**
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.yieldsAsync = function(args) {};

/**
 * @param {*} context
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.yieldsOnAsync = function(context, args) {};

/**
 * @param {string} property
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.yieldsToAsync = function(property, args) {};

/**
 * @param {string} property
 * @param {*} context
 * @param {...*} args
 * @return {!SinonStub}
 */
SinonStub.prototype.yieldsToOnAsync = function(property, context, args) {};

/**
 * @param {...*} args
 * @return {!SinonStub}
 * @override
 */
SinonStub.prototype.withArgs = function(args) {};



/**
 * @param {*=} obj
 * @param {string=} method
 * @param {*=} func
 * @return {!SinonStub}
 */
sinon.stub = function(obj, method, func) {};



/**
 * @constructor
 * @extends {SinonStub}
 */
var SinonExpectation = function() {};

/**
 * @param {number} n
 * @return {!SinonExpectation}
 */
SinonExpectation.prototype.atLeast = function(n) {};

/**
 * @param {number} n
 * @return {!SinonExpectation}
 */
SinonExpectation.prototype.atMost = function(n) {};

/**
 * @return {!SinonExpectation}
 */
SinonExpectation.prototype.never = function() {};

/**
 * @return {!SinonExpectation}
 */
SinonExpectation.prototype.once = function() {};

/**
 * @return {!SinonExpectation}
 */
SinonExpectation.prototype.twice = function() {};

/**
 * @return {!SinonExpectation}
 */
SinonExpectation.prototype.thrice = function() {};

/**
 * @param {number} n
 * @return {!SinonExpectation}
 */
SinonExpectation.prototype.exactly = function(n) {};

/**
 * @param {...*} args
 * @return {!SinonExpectation}
 * @override
 */
SinonExpectation.prototype.withArgs = function(args) {};

/**
 * @param {...*} args
 * @return {!SinonExpectation}
 */
SinonExpectation.prototype.withExactArgs = function(args) {};

/**
 * @param {*} obj
 * @return {!SinonExpectation}
 */
SinonExpectation.prototype.on = function(obj) {};

/**
 * @return {!SinonExpectation}
 */
SinonExpectation.prototype.verify = function() {};



sinon.expectation = {};

/**
 * @param {string} methodName
 * @return {!SinonExpectation}
 */
sinon.expectation.create = function(methodName) {};



/**
 * @constructor
 */
var SinonMock = function() {};

/**
 * @param {string} method
 * @return {!SinonExpectation}
 */
SinonMock.prototype.expects = function(method) {};

SinonMock.prototype.restore = function() {};

SinonMock.prototype.verify = function() {};



/**
 * @param {*} obj
 * @return {!SinonMock}
 */
sinon.mock = function(obj) {};



/** @interface */
var SinonMatcher = function() {};

/**
 * @param {!SinonMatcher} expr
 * @return {!SinonMatcher}
 */
SinonMatcher.prototype.and = function(expr) {};

/**
 * @param {!SinonMatcher} expr
 * @return {!SinonMatcher}
 */
SinonMatcher.prototype.or = function(expr) {};



/**
 * @param {number|string|RegExp|*|function(*): boolean} value
 * @return {!SinonMatcher}
 */
sinon.match = function(value) {};

/** @type {!SinonMatcher} */

sinon.match.any;

/** @type {!SinonMatcher} */
sinon.match.defined;

/** @type {!SinonMatcher} */
sinon.match.truthy;

/** @type {!SinonMatcher} */
sinon.match.falsy;

/** @type {!SinonMatcher} */
sinon.match.bool;

/** @type {!SinonMatcher} */
sinon.match.number;

/** @type {!SinonMatcher} */
sinon.match.string;

/** @type {!SinonMatcher} */
sinon.match.object;

/** @type {!SinonMatcher} */
sinon.match.func;

/** @type {!SinonMatcher} */
sinon.match.array;

/** @type {!SinonMatcher} */
sinon.match.regexp;

/** @type {!SinonMatcher} */
sinon.match.date;

/**
 * @param {*} obj
 * @return {!SinonMatcher}
 */
sinon.match.same = function(obj) {};

/**
 * @param {string} type
 * @return {!SinonMatcher}
 */
sinon.match.typeOf = function(type) {};

/**
 * @param {*} type
 * @return {!SinonMatcher}
 */
sinon.match.instanceOf = function(type) {};

/**
 * @param {string} property
 * @param {*=} expect
 * @return {!SinonMatcher}
 */
sinon.match.has = function(property, expect) {};

/**
 * @param {string} property
 * @param {*=} expect
 * @return {!SinonMatcher}
 */
sinon.match.hasOwn = function(property, expect) {};



sinon.sandbox = {};

/**
 * @param {!Object=} opt_config
 * @return {!SinonSandbox}
 */
sinon.sandbox.create = function(opt_config) {};

/**
 * @constructor
 */
var SinonSandbox = function() {};

SinonSandbox.prototype.restore = function() {};

/**
 * @type {!SinonFakeServer|undefined}
 */
SinonSandbox.prototype.server;

/**
 * @return {!SinonStub}
 */
SinonSandbox.prototype.stub = function() {};



sinon.fakeServer = {};

/**
 * @param {!Object=} opt_config
 * @return {!SinonFakeServer}
 */
sinon.fakeServer.create = function(opt_config) {};

/**
 * @constructor
 */
var SinonFakeServer = function() {};

/**
 * @type {!Array<!SinonFakeXmlHttpRequest>}
 */
SinonFakeServer.prototype.requests;

/**
 * @type {boolean|undefined}
 */
SinonFakeServer.prototype.respondImmediately;

SinonFakeServer.prototype.respond = function() {};

SinonFakeServer.prototype.restore = function() {};

/**
 * Note: incomplete definition because it is tricky.
 * @param {...*} var_args
 */
SinonFakeServer.prototype.respondWith = function(var_args) {};



/**
 * @constructor
 * @extends {XMLHttpRequest}
 */
var SinonFakeXmlHttpRequest = function() {};

/**
 * @type {?string}
 */
SinonFakeXmlHttpRequest.prototype.requestBody;

/**
 * @type {?Object<string, string>}
 */
SinonFakeXmlHttpRequest.prototype.requestHeaders;

/**
 * @type {?string}
 */
SinonFakeXmlHttpRequest.prototype.method;

/**
 * @type {?string}
 */
SinonFakeXmlHttpRequest.prototype.url;

/**
 * @param {?number} status
 * @param {?Object<string, string>} headers
 * @param {?string} body
 */
SinonFakeXmlHttpRequest.prototype.respond = function(status, headers, body) {};



/**
 * @param {...?} params
 * @return {Object}
 */
sinon.useFakeTimers = function(params) {};
