/*
 * Copyright 2014 The Closure Compiler Authors.
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
 * @fileoverview Externs for the $q service in Angular 1.4
 * NOTE: Due to a JS compiler bug, any use of a templated class must occur after
 * the class is defined. Please be careful with the ordering of the classes and
 * functions.
 * @see https://docs.angularjs.org/api/ng/service/$q
 * @externs
 */

/******************************************************************************
 * $q Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$q = function() {};

/**
 * @constructor
 * @template T
 */
angular.$q.Promise = function() {};

/**
 * Apply Type Transformation Language to allow more accurate templated type
 * definition.
 * This is copied from <code>goog.Thenable.prototype.then</code>, with the only
 * difference being the raw type as angular.$q.Promise instead of goog.Promise.
 *
 * @param {?(function(this:THIS, T): VALUE)=} opt_onFulfilled
 * @param {?(function(?): ?)=} opt_onRejected
 * @param {?(function(?): ?)=} opt_notifyCallback
 * @return {RESULT}
 * @template THIS
 * @template VALUE
 * @template RESULT := type('angular.$q.Promise',
 *     cond(isUnknown(VALUE), unknown(),
 *       mapunion(VALUE, (V) =>
 *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
 *           templateTypeOf(V, 0),
 *           cond(sub(V, 'angular.$q.Promise'),
 *              unknown(),
 *              V)))))
 *  =:
 */
angular.$q.Promise.prototype.then =
    function(opt_onFulfilled, opt_onRejected, opt_notifyCallback) {};

/**
 * @param {?function(?)} callback
 * @return {!angular.$q.Promise.<T>}
 */
angular.$q.Promise.prototype.catch = function(callback) {};

/**
 * @param {?function(?)} callback
 * @return {!angular.$q.Promise.<T>}
 */
angular.$q.Promise.prototype.finally = function(callback) {};

/**
 * @constructor
 * @template T
 */
angular.$q.Deferred = function() {};

/** @param {T=} opt_value */
angular.$q.Deferred.prototype.resolve = function(opt_value) {};

/** @param {?=} opt_reason */
angular.$q.Deferred.prototype.reject = function(opt_reason) {};

/** @param {?=} opt_value */
angular.$q.Deferred.prototype.notify = function(opt_value) {};

/** @type {!angular.$q.Promise.<T>} */
angular.$q.Deferred.prototype.promise;

/**
 * $q.all has different output type based on the input type.
 * When {@code promise} is an array, the output is an array too: for each item n
 * in the input array, the corresponding item in the returned array would be the
 * the same type of n, or if n is a templated $q.Promise, the type of the
 * resolve value.
 * When {@code promise} is in form of a record, the output should be also be a
 * record with the same properties.
 * When {@code promise} is other forms, the returned type is an Object.
 *
 * @param {VALUE} promises
 * @template VALUE
 * @return {ALLTYPE}
 * @template ALLTYPE := type('angular.$q.Promise',
 *   cond(isUnknown(VALUE), unknown(),
 *     mapunion(VALUE, (x) =>
 *       cond(sub(x, 'Array'),
 *         cond(isTemplatized(x) && sub(rawTypeOf(x), 'IThenable'),
 *           type('Array', templateTypeOf(x, 0)),
 *           'Array'
 *         ),
 *         cond(isRecord(x),
 *           maprecord(record(x), (kx, vx) => record({[kx]:
 *             cond(isTemplatized(vx) && sub(rawTypeOf(vx), 'IThenable'),
 *               templateTypeOf(vx, 0),
 *               cond(sub(vx, 'angular.$q.Promise'),
 *                 unknown(),
 *                 vx
 *               )
 *             )
 *           })),
 *           'Object')))))
 * =:
 */
angular.$q.prototype.all = function(promises) {};

/**
 * @return {!angular.$q.Deferred}
 */
angular.$q.prototype.defer = function() {};

/**
 * @param {?=} opt_reason
 * @return {!angular.$q.Promise}
 */
angular.$q.prototype.reject = function(opt_reason) {};

/**
 * @param {RESULT} value
 * @return {!angular.$q.Promise.<RESULT>}
 * @template RESULT
 */
angular.$q.prototype.when = function(value) {};
