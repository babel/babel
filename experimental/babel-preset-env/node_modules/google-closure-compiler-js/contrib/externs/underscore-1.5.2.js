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
 * @fileoverview Externs for Underscore 1.5.2.
 *
 * TODO: Wrapper objects.
 * TODO: _.bind - for some reason this plays up in practice.
 *
 * @see http://documentcloud.github.com/underscore/
 * @externs
 */

/**
 * @param {*} obj
 * @return {!_}
 * @constructor
 */
function _(obj) {}

// Collection functions

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?)} iterator
 * @param {CONTEXT=} opt_context
 * @template CONTEXT, VALUE
 */
_.each = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?)} iterator
 * @param {CONTEXT=} opt_context
 * @template CONTEXT, VALUE
 */
_.forEach = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?) : RETURN} iterator
 * @param {CONTEXT=} opt_context
 * @return {!Array.<RETURN>}
 * @template CONTEXT, VALUE, RETURN
 */
_.map = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?) : RETURN} iterator
 * @param {CONTEXT=} opt_context
 * @return {!Array.<RETURN>}
 * @template CONTEXT, VALUE, RETURN
 */
_.collect = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, ?, VALUE, ?, ?) : RETURN} iterator
 * @param {?} memo
 * @param {CONTEXT=} opt_context
 * @return {RETURN}
 * @template CONTEXT, VALUE, RETURN
 */
_.reduce = function(obj, iterator, memo, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, ?, VALUE, ?, ?) : RETURN} iterator
 * @param {?} memo
 * @param {CONTEXT=} opt_context
 * @return {RETURN}
 * @template CONTEXT, VALUE, RETURN
 */
_.inject = function(obj, iterator, memo, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, ?, VALUE, ?, ?) : RETURN} iterator
 * @param {?} memo
 * @param {CONTEXT=} opt_context
 * @return {RETURN}
 * @template CONTEXT, VALUE, RETURN
 */
_.foldl = function(obj, iterator, memo, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, ?, VALUE, ?, ?) : RETURN} iterator
 * @param {?} memo
 * @param {CONTEXT=} opt_context
 * @return {RETURN}
 * @template CONTEXT, VALUE, RETURN
 */
_.reduceRight = function(obj, iterator, memo, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, ?, VALUE, ?, ?) : RETURN} iterator
 * @param {VALUE} memo
 * @param {CONTEXT=} opt_context
 * @return {RETURN}
 * @template CONTEXT, VALUE, RETURN
 */
_.foldr = function(obj, iterator, memo, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?) : ?} iterator
 * @param {CONTEXT=} opt_context
 * @return {VALUE|undefined}
 * @template CONTEXT, VALUE
 */
_.find = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?) : ?} iterator
 * @param {CONTEXT=} opt_context
 * @return {VALUE|undefined}
 * @template CONTEXT, VALUE
 */
_.detect = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?) : ?} iterator
 * @param {CONTEXT=} opt_context
 * @return {!Array.<VALUE>}
 * @template CONTEXT, VALUE
 */
_.filter = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?) : ?} iterator
 * @param {CONTEXT=} opt_context
 * @return {!Array.<VALUE>}
 * @template CONTEXT, VALUE
 */
_.select = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {Object} properties
 * @return {!Array.<VALUE>}
 * @template VALUE
 */
_.where = function(obj, properties) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {Object.<string, ?>} properties
 * @return {VALUE|undefined}
 * @template VALUE
 */
_.findWhere = function(obj, properties) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?) : ?} iterator
 * @param {CONTEXT=} opt_context
 * @return {!Array.<VALUE>}
 * @template CONTEXT, VALUE
 */
_.reject = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {(function(this:CONTEXT, VALUE, ?, ?) : ?)=} opt_iterator
 * @param {CONTEXT=} opt_context
 * @return {boolean}
 * @template CONTEXT, VALUE
 */
_.every = function(obj, opt_iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {(function(this:CONTEXT, VALUE, ?, ?) : ?)=} opt_iterator
 * @param {CONTEXT=} opt_context
 * @return {boolean}
 * @template CONTEXT, VALUE
 */
_.all = function(obj, opt_iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {(function(this:CONTEXT, VALUE, ?, ?) : ?)=} opt_iterator
 * @param {CONTEXT=} opt_context
 * @return {boolean}
 * @template CONTEXT, VALUE
 */
_.some = function(obj, opt_iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {(function(this:CONTEXT, VALUE, ?, ?) : ?)=} opt_iterator
 * @param {CONTEXT=} opt_context
 * @return {boolean}
 * @template CONTEXT, VALUE
 */
_.any = function(obj, opt_iterator, opt_context) {};

/**
 * @param {Object|Array} obj
 * @param {*} target
 * @return {boolean}
 */
_.contains = function(obj, target) {};

/**
 * @param {Object|Array} obj
 * @param {*} target
 * @return {boolean}
 */
_.include = function(obj, target) {};

/**
 * @param {Object|Array} obj
 * @param {string|Function} method
 * @param {...*} var_args
 */
_.invoke = function(obj, method, var_args) {};

/**
 * @param {Array.<Object.<?, VALUE>>} obj
 * @param {string} key
 * @return {!Array.<VALUE>}
 * @template VALUE
 */
_.pluck = function(obj, key) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?) : ?=} opt_iterator
 * @param {CONTEXT=} opt_context
 * @return {VALUE}
 * @template CONTEXT, VALUE
 */
_.max = function(obj, opt_iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {function(this:CONTEXT, VALUE, ?, ?) : ?=} opt_iterator
 * @param {CONTEXT=} opt_context
 * @return {VALUE}
 * @template CONTEXT, VALUE
 */
_.min = function(obj, opt_iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {string|function(this:CONTEXT, VALUE, ?, ?) : ?} iterator
 * @param {CONTEXT=} opt_context
 * @return {!Array.<VALUE>}
 * @template CONTEXT, VALUE
 */
_.sortBy = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {string|function(this:CONTEXT, VALUE, ?, ?) : ?} iterator
 * @param {CONTEXT=} opt_context
 * @return {!Object.<Array.<VALUE>>}
 * @template CONTEXT, VALUE
 */
_.groupBy = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {string|function(this:CONTEXT, VALUE, ?, ?) : ?} iterator
 * @param {CONTEXT=} opt_context
 * @return {!Object.<?, VALUE>}
 * @template CONTEXT, VALUE
 */
_.indexBy = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {string|function(this:CONTEXT, VALUE, ?, ?) : ?} iterator
 * @param {CONTEXT=} opt_context
 * @return {!Object.<?, number>}
 * @template CONTEXT, VALUE
 */
_.countBy = function(obj, iterator, opt_context) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @return {!Array.<VALUE>}
 * @template VALUE
 */
_.shuffle = function(obj) {};

/**
 * @param {Object.<?, VALUE>|Array.<VALUE>} obj
 * @param {number=} opt_n
 * @return {VALUE|Array.<VALUE>}
 * @template VALUE
 */
_.sample = function(obj, opt_n) {};

/**
 * @param {*} iterable
 * @return {!Array}
 */
_.toArray = function(iterable) {};

/**
 * @param {Object|Array} obj
 * @return {number}
 */
_.size = function(obj) {};

// Array functions

/**
 * @param {Array.<VALUE>} array
 * @param {number=} opt_n
 * @return {VALUE|!Array.<VALUE>}
 * @template VALUE
 */
_.first = function(array, opt_n) {};

/**
 * @param {Array.<VALUE>} array
 * @param {number=} opt_n
 * @return {VALUE|!Array.<VALUE>}
 * @template VALUE
 */
_.head = function(array, opt_n) {};

/**
 * @param {Array.<VALUE>} array
 * @param {number=} opt_n
 * @return {VALUE|!Array.<VALUE>}
 * @template VALUE
 */
_.take = function(array, opt_n) {};

/**
 * @param {Array.<VALUE>} array
 * @param {number=} opt_n
 * @return {!Array.<VALUE>}
 * @template VALUE
 */
_.initial = function(array, opt_n) {};

/**
 * @param {Array.<VALUE>} array
 * @param {number=} opt_n
 * @return {VALUE|!Array.<VALUE>}
 * @template VALUE
 */
_.last = function(array, opt_n) {};

/**
 * @param {Array.<VALUE>} array
 * @param {number=} opt_n
 * @return {!Array.<VALUE>}
 * @template VALUE
 */
_.rest = function(array, opt_n) {};

/**
 * @param {Array.<VALUE>} array
 * @param {number=} opt_n
 * @return {!Array.<VALUE>}
 * @template VALUE
 */
_.tail = function(array, opt_n) {};

/**
 * @param {Array.<VALUE>} array
 * @param {number=} opt_n
 * @return {!Array.<VALUE>}
 * @template VALUE
 */
_.drop = function(array, opt_n) {};

/**
 * @param {!Array.<VALUE>} array
 * @return {!Array.<VALUE>}
 * @template VALUE
 */
_.compact = function(array) {};

/**
 * @param {Array} array
 * @param {boolean=} opt_shallow
 * @return {!Array}
 */
_.flatten = function(array, opt_shallow) {};

/**
 * @param {!Array.<VALUE>} array
 * @param {...VALUE} var_args
 * @return {!Array.<VALUE>}
 * @template VALUE
 */
_.without = function(array, var_args) {};

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
 * @param {Array} array
 * @param {...Array} arrays
 * @return {!Array}
 */
_.difference = function(array, arrays) {};

/**
 * @param {!Array.<VALUE>} array
 * @param {boolean=} opt_isSorted
 * @param {(function(this:CONTEXT, VALUE, ?, ?) : RETURN)=} opt_iterator
 * @param {CONTEXT=} opt_context
 * @return {!Array.<RETURN>}
 * @template CONTEXT, VALUE, RETURN
 */
_.uniq = function(array, opt_isSorted, opt_iterator, opt_context) {};

/**
 * @param {!Array.<VALUE>} array
 * @param {boolean=} opt_isSorted
 * @param {(function(this:CONTEXT, VALUE, ?, ?) : RETURN)=} opt_iterator
 * @param {CONTEXT=} opt_context
 * @return {!Array.<RETURN>}
 * @template CONTEXT, VALUE, RETURN
 */
_.unique = function(array, opt_isSorted, opt_iterator, opt_context) {};

/**
 * @param {...Array} arrays
 * @return {!Array}
 */
_.zip = function(arrays) {};

/**
 * @param {!Array} list
 * @param {Array=} opt_values
 * @return {!Object}
 */
_.object = function(list, opt_values) {};

/**
 * @param {Array} array
 * @param {*} item
 * @param {boolean=} opt_isSorted
 * @return {number}
 */
_.indexOf = function(array, item, opt_isSorted) {};

/**
 * @param {Array} array
 * @param {*} item
 * @param {number=} opt_fromindex
 * @return {number}
 */
_.lastIndexOf = function(array, item, opt_fromindex) {};

/**
 * @param {Array.<VALUE>} list
 * @param {VALUE} obj
 * @param {(function(this:CONTEXT, VALUE) : ?)=} opt_iterator
 * @param {CONTEXT=} opt_context
 * @return {number}
 * @template CONTEXT, VALUE
 */
_.sortedIndex = function(list, obj, opt_iterator, opt_context) {};

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
 * @param {...*} var_args
 * @return {!Function}
 */
_.partial = function(func, var_args) {};

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
 * @param {Object=} opt_options
 * @return {!Function}
 */
_.throttle = function(func, wait, opt_options) {};

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean=} opt_immediate
 * @return {!Function}
 */
_.debounce = function(func, wait, opt_immediate) {};

/**
 * @param {Function} func
 * @return {!Function}
 */
_.once = function(func) {};

/**
 * @param {number} times
 * @param {Function} func
 * @return {!Function}
 */
_.after = function(times, func) {};

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

// Object functions

/**
 * @param {Object} obj
 * @return {!Array.<string>}
 */
_.keys = function(obj) {};

/**
 * @param {Object.<?, VALUE>} obj
 * @return {!Array.<VALUE>}
 * @template VALUE
 */
_.values = function(obj) {};

/**
 * @param {Object} obj
 * @return {!Array.<!Array>}
 */
_.pairs = function(obj) {};

/**
 * @param {Object.<K, V>} obj
 * @return {!Object.<V, K>}
 * @template K, V
 */
_.invert = function(obj) {};

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
 * @param {Object.<K, V>} obj
 * @param {...K|Array.<K>} keys
 * @return {Object.<K, V>}
 * @template K, V
 */
_.pick = function(obj, keys) {};

/**
 * @param {Object.<K, V>} obj
 * @param {...string|Array.<string>} keys
 * @return {Object.<K, V>}
 * @template K, V
 */
_.omit = function(obj, keys) {};

/**
 * @param {Object} obj
 * @param {...Object} defs
 */
_.defaults = function(obj, defs) {};

/**
 * @param {Object.<K, V>} obj
 * @return {Object.<K, V>}
 * @template K, V
 */
_.clone = function(obj) {};

/**
 * @param {Object.<K, V>} obj
 * @param {function(Object.<K, V>)} interceptor
 * @return {Object.<K, V>} obj
 * @template K, V
 */
_.tap = function(obj, interceptor) {};

/**
 * @param {Object} obj
 * @param {string} key
 * @return {boolean}
 */
_.has = function(obj, key) {};

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
_.isFinite = function(obj) {};

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
_.isNaN = function(obj) {};

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

// Utility functions

/**
 * @return {_}
 */
_.noConflict = function() {};

/**
 * @param {VALUE} value
 * @return {VALUE}
 * @template VALUE
 */
_.identity = function(value) {};

/**
 * @param {number} n
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {Array}
 */
_.times = function(n, iterator, opt_context) {};

/**
 * @param {number} min
 * @param {number=} opt_max
 * @return {number}
 */
_.random = function(min, opt_max) {};

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
 * @param {string} s
 * @return {string}
 */
_.escape = function(s) {};

/**
 * @param {string} s
 * @return {string}
 */
_.unescape = function(s) {};

/**
 * @param {Object} obj
 * @param {string|Function} property
 * @return {*}
 */
_.result = function(obj, property) {};

/**
 * @param {string} str
 * @param {Object=} opt_data
 * @param {Object=} opt_settings
 */
_.template = function(str, opt_data, opt_settings) {};

// Chaining functions

/**
 * @param {Object} obj
 * @return {Object}
 */
_.chain = function(obj) {};
