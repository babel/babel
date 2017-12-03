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
 * @fileoverview Externs for the $q service in Angular 1.2
 * @see https://docs.angularjs.org/api/ng/service/$q
 * @externs
 */


/******************************************************************************
 * $q Service
 *****************************************************************************/

/**
 * @typedef {{
 *   all: function((Object.<!angular.$q.Promise>|Array.<!angular.$q.Promise>)):
 *       !angular.$q.Promise,
 *   defer: function():!angular.$q.Deferred,
 *   reject: function(*):!angular.$q.Promise,
 *   when: function(*):!angular.$q.Promise
 *   }}
 */
angular.$q;

/**
 * @param {!Object.<!angular.$q.Promise>|Array.<!angular.$q.Promise>} promises
 * @return {!angular.$q.Promise}
 */
angular.$q.all = function(promises) {};

/**
 * @return {!angular.$q.Deferred}
 */
angular.$q.defer = function() {};

/**
 * @param {*=} opt_reason
 * @return {!angular.$q.Promise}
 */
angular.$q.reject = function(opt_reason) {};

/**
 * @param {*} value
 * @return {!angular.$q.Promise}
 */
angular.$q.when = function(value) {};

/**
 * @typedef {{
 *   resolve: function(*=),
 *   reject: function(*=),
 *   notify: function(*=),
 *   promise: !angular.$q.Promise
 *   }}
 */
angular.$q.Deferred;

/** @param {*=} opt_value */
angular.$q.Deferred.resolve = function(opt_value) {};

/** @param {*=} opt_reason */
angular.$q.Deferred.reject = function(opt_reason) {};

/** @param {*=} opt_value */
angular.$q.Deferred.notify = function(opt_value) {};

/** @type {!angular.$q.Promise} */
angular.$q.Deferred.promise;

/**
 * @typedef {{
 *   then: function(?function(?), ?function(?)=, ?function(?)=):
 *       angular.$q.Promise,
 *   catch: function(?function(?)):angular.$q.Promise,
 *   finally: function(?function(?)):angular.$q.Promise
 * }}
 */
angular.$q.Promise;

/**
 * @param {?function(?)} successCallback
 * @param {?function(?)=} opt_errorCallback
 * @param {?function(?)=} opt_notifyCallback
 * @return {!angular.$q.Promise}
 */
angular.$q.Promise.then =
    function(successCallback, opt_errorCallback, opt_notifyCallback) {};

/**
 * @param {?function(?)} callback
 * @return {!angular.$q.Promise}
 */
angular.$q.Promise.catch = function(callback) {};

/**
 * @param {?function(?)} callback
 * @return {!angular.$q.Promise}
 */
angular.$q.Promise.finally = function(callback) {};
