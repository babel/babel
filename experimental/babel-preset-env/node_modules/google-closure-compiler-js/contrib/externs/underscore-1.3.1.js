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
 * @fileoverview Externs for Underscore 1.3.1.
 *
 * TODO: Wrapper objects.
 * TODO: _.bind - for some reason this plays up in practice.
 *
 * @see http://documentcloud.github.com/underscore/
 * @externs
 */

/**
 * @param {Object} obj
 * @return {!_}
 * @constructor
 */
function _(obj) {}

// Collection functions

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 */
_.each = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 */
_.forEach = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {!Array}
 */
_.map = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {!Array}
 */
_.collect = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {*} memo
 * @param {Object=} opt_context
 * @return {!*}
 */
_.reduce = function(obj, iterator, memo, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {*} memo
 * @param {Object=} opt_context
 * @return {!*}
 */
_.inject = function(obj, iterator, memo, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {*} memo
 * @param {Object=} opt_context
 * @return {!*}
 */
_.foldl = function(obj, iterator, memo, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {*} memo
 * @param {Object=} opt_context
 * @return {!*}
 */
_.reduceRight = function(obj, iterator, memo, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {*} memo
 * @param {Object=} opt_context
 * @return {!*}
 */
_.foldr = function(obj, iterator, memo, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {!*}
 */
_.find = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {!*}
 */
_.detect = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {!Array}
 */
_.filter = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {!Array}
 */
_.select = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {!Array}
 */
_.reject = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {boolean}
 */
_.every = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {boolean}
 */
_.all = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function=} opt_iterator
 * @param {Object=} opt_context
 * @return {boolean}
 */
_.some = function(obj, opt_iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function=} opt_iterator
 * @param {Object=} opt_context
 * @return {boolean}
 */
_.any = function(obj, opt_iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {*} target
 * @return {boolean}
 */
_.include = function(obj, target) {};

/**
 * @param {Object|Array} obj
 * @param {*} target
 * @return {boolean}
 */
_.contains = function(obj, target) {};

/**
 * @param {Object|Array} obj
 * @param {Function} method
 * @param {...*} var_args
 */
_.invoke = function(obj, method, var_args) {};

/**
 * @param {Array.<Object>} obj
 * @param {string} key
 * @return {!Array}
 */
_.pluck = function(obj, key) {};

/**
 * @param {Object|Array} obj
 * @param {Function=} opt_iterator
 * @param {Object=} opt_context
 * @return {!*}
 */
_.max = function(obj, opt_iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {Function=} opt_iterator
 * @param {Object=} opt_context
 * @return {!*}
 */
_.min = function(obj, opt_iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @return {!Array}
 */
_.shuffle = function(obj) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {!Array}
 */
_.sortBy = function(obj, iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {string|Function} iterator
 * @return {!Array.<!Array>}
 */
_.groupBy = function(obj, iterator) {};

/**
 * @param {Array} list
 * @param {*} obj
 * @param {Function=} opt_iterator
 * @return {!number}
 */
_.sortedIndex = function(list, obj, opt_iterator) {};

/**
 * @param {*} iterable
 * @return {!Array}
 */
_.toArray = function(iterable) {};

/**
 * @param {Object|Array} obj
 * @return {!Array}
 */
_.size = function(obj) {};

// Array functions

/**
 * @param {Array} array
 * @param {number=} opt_n
 * @return {!*}
 */
_.first = function(array, opt_n) {};

/**
 * @param {Array} array
 * @param {number=} opt_n
 * @return {!*}
 */
_.head = function(array, opt_n) {};

/**
 * @param {Array} array
 * @param {number=} opt_n
 * @return {!Array}
 */
_.initial = function(array, opt_n) {};

/**
 * @param {Array} array
 * @param {number=} opt_n
 * @return {!Array}
 */
_.last = function(array, opt_n) {};

/**
 * @param {Array} array
 * @param {number=} opt_n
 * @return {!*}
 */
_.rest = function(array, opt_n) {};

/**
 * @param {Array} array
 * @param {number=} opt_n
 * @return {!*}
 */
_.tail = function(array, opt_n) {};

/**
 * @param {Array} array
 * @return {!Array}
 */
_.compact = function(array) {};

/**
 * @param {Array} array
 * @param {boolean=} opt_shallow
 * @return {!Array}
 */
_.flatten = function(array, opt_shallow) {};

/**
 * @param {Array} array
 * @param {...*} var_args
 * @return {!Array}
 */
_.without = function(array, var_args) {};

/**
 * @param {Array} array
 * @param {boolean=} opt_isSorted
 * @param {Function=} opt_iterator
 * @return {!Array}
 */
_.uniq = function(array, opt_isSorted, opt_iterator) {};

/**
 * @param {Array} array
 * @param {boolean=} opt_isSorted
 * @param {Function=} opt_iterator
 * @return {!Array}
 */
_.unique = function(array, opt_isSorted, opt_iterator) {};

/**
 * @param {...Array} arrays
 * @return {!Array}
 */
_.union = function(arrays) {};

/**
 * @param {...Array} arrays
 * @return {!Array}
 */
_.intersection = function(arrays) {};

/**
 * @param {...Array} arrays
 * @return {!Array}
 */
_.intersect = function(arrays) {};

/**
 * @param {Array} array
 * @param {...Array} arrays
 * @return {!Array}
 */
_.difference = function(array, arrays) {};

/**
 * @param {...Array} arrays
 * @return {!Array}
 */
_.zip = function(arrays) {};

/**
 * @param {Array} array
 * @param {*} item
 * @param {boolean=} opt_isSorted
 * @return {!number}
 */
_.indexOf = function(array, item, opt_isSorted) {};

/**
 * @param {Array} array
 * @param {*} item
 * @return {!number}
 */
_.lastIndexOf = function(array, item) {};

/**
 * @param {number} start
 * @param {number=} opt_stop
 * @param {number=} opt_step
 * @return {!Array.<number>}
 */
_.range = function(start, opt_stop, opt_step) {};

// Function (ahem) functions

/**
 * @param {Object} obj
 * @param {...string} methodNames
 */
_.bindAll = function(obj, methodNames) {};

/**
 * @param {Function} func
 * @param {Function=} opt_hasher
 */
_.memoize = function(func, opt_hasher) {};

/**
 * @param {Function} func
 * @param {number} wait
 * @param {...*} var_args
 */
_.delay = function(func, wait, var_args) {};

/**
 * @param {Function} func
 */
_.defer = function(func) {};

/**
 * @param {Function} func
 * @param {number} wait
 */
_.throttle = function(func, wait) {};

/**
 * @param {Function} func
 * @param {number} wait
 */
_.debounce = function(func, wait) {};

/**
 * @param {Function} func
 */
_.once = function(func) {};

/**
 * @param {Function} func
 * @param {Function} wrapper
 * @return {!Function}
 */
_.wrap = function(func, wrapper) {};

/**
 * @param {...Function} funcs
 * @return {!Function}
 */
_.compose = function(funcs) {};

/**
 * @param {number} times
 * @param {Function} func
 */
_.after = function(times, func) {};

// Object functions

/**
 * @param {Object} obj
 * @return {!Array.<string>}
 */
_.keys = function(obj) {};

/**
 * @param {Object} obj
 * @return {!Array}
 */
_.values = function(obj) {};

/**
 * @param {Object} obj
 * @return {!Array.<string>}
 */
_.functions = function(obj) {};

/**
 * @param {Object} obj
 * @return {!Array.<string>}
 */
_.methods = function(obj) {};

/**
 * @param {Object} obj
 * @param {...Object} objs
 */
_.extend = function(obj, objs) {};

/**
 * @param {Object} obj
 * @param {...Object} defs
 */
_.defaults = function(obj, defs) {};

/**
 * @param {Object} obj
 * @return {Object}
 */
_.clone = function(obj) {};

/**
 * @param {Object} obj
 * @param {Function} interceptor
 * @return {Object} obj
 */
_.tap = function(obj, interceptor) {};

/**
 * @param {Object} a
 * @param {Object} b
 * @return {boolean}
 */
_.isEqual = function(a, b) {};

/**
 * @param {Object|Array|string} obj
 * @return {boolean}
 */
_.isEmpty = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isElement = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isArray = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isObject = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isArguments = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isFunction = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isString = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isNumber = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isNaN = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isBoolean = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isDate = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isRegExp = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isNull = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 */
_.isUndefined = function(obj) {};

/**
 * @param {Object} obj
 * @param {string} key
 * @return {boolean}
 */
_.has = function(obj, key) {};

// Utility functions

/**
 * @return {_}
 */
_.noConflict = function() {};

/**
 * @param {*} value
 * @return {*}
 */
_.identity = function(value) {};

/**
 * @param {number} n
 * @param {Function} iterator
 * @param {Object=} opt_context
 */
_.times = function(n, iterator, opt_context) {};

/**
 * @param {string} s
 * @return {string}
 */
_.escape = function(s) {};

/**
 * @param {Object} obj
 */
_.mixin = function(obj) {};

/**
 * @param {string=} opt_prefix
 * @return {number|string}
 */
_.uniqueId = function(opt_prefix) {};

/**
 * @param {string} str
 * @param {Object=} opt_data
 */
_.template = function(str, opt_data) {};
