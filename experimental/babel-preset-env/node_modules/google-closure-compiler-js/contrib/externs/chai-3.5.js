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
 * @fileoverview Externs definitions for Chai, 3.5 branch.
 *
 * This file defines both the BDD and TDD APIs. The BDD API should be complete.
 *
 * This file defines some virtual types for the chained methods, please don't
 * use these types directly, but follow the official API guidelines.
 *
 * @externs
 * @see http://chaijs.com/
 */

// Below are the externs for the BDD expect API: http://chaijs.com/api/bdd/

/**
 * @param {*} subject
 * @param {string=} opt_description
 * @return {!ExpectChain}
 */
var expect = function(subject, opt_description) {};

/**
 * Represents the chainable return type of `expect()`.
 * @constructor
 */
var ExpectChain = function() {};

/**
 * Represent a non-chainable terminal part in an `expect()` chain. These are
 * effectively assertions.
 * @constructor
 */
var ExpectChainTerminal = function() {};

/** @type {!ExpectChain} */ ExpectChain.prototype.to;
/** @type {!ExpectChain} */ ExpectChain.prototype.be;
/** @type {!ExpectChain} */ ExpectChain.prototype.been;
/** @type {!ExpectChain} */ ExpectChain.prototype.is;
/** @type {!ExpectChain} */ ExpectChain.prototype.that;
/** @type {!ExpectChain} */ ExpectChain.prototype.which;
/** @type {!ExpectChain} */ ExpectChain.prototype.and;
/** @type {!ExpectChain} */ ExpectChain.prototype.has;
/** @type {!ExpectChain} */ ExpectChain.prototype.have;
/** @type {!ExpectChain} */ ExpectChain.prototype.with;
/** @type {!ExpectChain} */ ExpectChain.prototype.at;
/** @type {!ExpectChain} */ ExpectChain.prototype.of;
/** @type {!ExpectChain} */ ExpectChain.prototype.same;
/** @type {!ExpectChain} */ ExpectChain.prototype.not;
/** @type {!ExpectChain} */ ExpectChain.prototype.deep;
/** @type {!ExpectChain} */ ExpectChain.prototype.any;
/** @type {!ExpectChain} */ ExpectChain.prototype.all;
/** @type {!ExpectChain} */ ExpectChain.prototype.length;
/** @type {!ExpectChain} */ ExpectChain.prototype.itself;

/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.ok;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.true;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.false;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.null;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.undefined;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.NaN;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.exist;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.empty;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.arguments;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.extensible;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.sealed;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.frozen;

/**
 * @param {string} type
 * @param {string=} opt_message
 */
ExpectChain.prototype.a = function(type, opt_message) {};

/**
 * @param {*} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.include = function(value, opt_message) {};

/**
 * @param {*} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.equal = function(value, opt_message) {};

/**
 * @param {*} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.eql = function(value, opt_message) {};

/**
 * @param {number} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.above = function(value, opt_message) {};

/**
 * @param {number} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.least = function(value, opt_message) {};

/**
 * @param {number} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.below = function(value, opt_message) {};

/**
 * @param {number} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.most = function(value, opt_message) {};

/**
 * @param {number} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.within = function(value, opt_message) {};

/**
 * @param {function(new: Object)} constructor
 * @param {string=} opt_message
 */
ExpectChain.prototype.instanceof = function(constructor, opt_message) {};

/**
 * @param {string} name
 * @param {*=} opt_value
 * @param {string=} opt_message
 */
ExpectChain.prototype.property = function(name, opt_value, opt_message) {};

/**
 * @param {string} name
 * @param {string=} opt_message
 */
ExpectChain.prototype.ownProperty = function(name, opt_message) {};

/**
 * @param {string} name
 * @param {!Object=} opt_descriptor
 * @param {string=} opt_message
 */
ExpectChain.prototype.ownPropertyDescriptor =
    function(name, opt_descriptor, opt_message) {};

/**
 * @param {number} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.lengthOf = function(value, opt_message) {};

/**
 * @param {!RegExp} re
 * @param {string=} opt_message
 */
ExpectChain.prototype.match = function(re, opt_message) {};

/**
 * @param {string} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.string = function(value, opt_message) {};

/**
 * @param {*} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.keys = function(value, opt_message) {};

/**
 * Note: incomplete definition because it is tricky.
 * @param {...*} var_args
 */
ExpectChain.prototype.throw = function(var_args) {};

/**
 * @param {string} method
 * @param {string=} opt_message
 */
ExpectChain.prototype.respondTo = function(method, opt_message) {};

/**
 * @param {function(*): boolean} matcher
 * @param {string=} opt_message
 */
ExpectChain.prototype.satisfy = function(matcher, opt_message) {};

/**
 * @param {!Array<*>} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.members = function(value, opt_message) {};

/**
 * @param {!Array<*>} value
 * @param {string=} opt_message
 */
ExpectChain.prototype.oneOf = function(value, opt_message) {};

/**
 * @param {*} value
 * @param {string} name
 * @param {string=} opt_message
 */
ExpectChain.prototype.change = function(value, name, opt_message) {};

/**
 * @param {*} value
 * @param {string} name
 * @param {string=} opt_message
 */
ExpectChain.prototype.increase = function(value, name, opt_message) {};

/**
 * @param {*} value
 * @param {string} name
 * @param {string=} opt_message
 */
ExpectChain.prototype.decrease = function(value, name, opt_message) {};

// Below are the externs for the TDD expect API: http://chaijs.com/api/assert/

/** @const */
var assert = {};

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string=} opt_message
 * @param {string=} opt_operator
 */
assert.fail = function(actual, expected, opt_message, opt_operator) {};

/**
 * @param {*} object
 * @param {string=} opt_message
 */
assert.isOk = function(object, opt_message) {};

/**
 * @param {*} object
 * @param {string=} opt_message
 */
assert.isNotOk = function(object, opt_message) {};

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string=} opt_message
 */
assert.equal = function(actual, expected, opt_message) {};

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string=} opt_message
 */
assert.notEqual = function(actual, expected, opt_message) {};

/**
 * @param {*} actual
 * @param {*} expected
 * @param {string=} opt_message
 */
assert.deepEqual = function(actual, expected, opt_message) {};

/**
 * @param {*} valueToCheck
 * @param {*} valueToBeAbove
 * @param {string=} opt_message
 */
assert.isAbove = function(valueToCheck, valueToBeAbove, opt_message) {};

/**
 * @param {*} valueToCheck
 * @param {*} valueToBeBelow
 * @param {string=} opt_message
 */
assert.isBelow = function(valueToCheck, valueToBeBelow, opt_message) {};

/**
 * @param {*} value
 * @param {string=} opt_message
 */
assert.isTrue = function(value, opt_message) {};

/**
 * @param {*} value
 * @param {string=} opt_message
 */
assert.isFalse = function(value, opt_message) {};

/**
 * @param {*} value
 * @param {string=} opt_message
 */
assert.isUndefined = function(value, opt_message) {};

/**
 * @param {*} value
 * @param {string=} opt_message
 */
assert.isDefined = function(value, opt_message) {};

/**
 * @param {*} object
 * @param {function(new: Object)} constructor
 * @param {string=} opt_message
 */
assert.instanceOf = function(object, constructor, opt_message) {};

/**
 * @param {*} object
 * @param {!RegExp} re
 * @param {string=} opt_message
 */
assert.match = function(object, re, opt_message) {};

/**
 * @param {?Object|undefined} object
 * @param {string} property
 * @param {*} value
 * @param {string=} opt_message
 */
assert.propertyVal = function(object, property, value, opt_message) {};

/**
 * @param {function()} fn
 * @param {function(new: Object)|string|!RegExp} constructor
 * @param {string|!RegExp=} opt_regexp
 * @param {string=} opt_message
 */
assert.throws = function(fn, constructor, opt_regexp, opt_message) {};
