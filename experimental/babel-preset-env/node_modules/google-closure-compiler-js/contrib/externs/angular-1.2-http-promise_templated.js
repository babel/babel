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
 * @fileoverview AngularJS' HTTP promises. This version of the externs file
 * provides templated promises.
 * @see https://docs.angularjs.org/api/ng/service/$http
 * @externs
 */

/**
 * @typedef {function((string|Object), number,
 *     function(string=): (string|Object|null), angular.$http.Config)}
 */
angular.HttpCallback;

/**
 * @constructor
 * @template T
 */
angular.$http.Response;

/** @type {T} */
angular.$http.Response.prototype.data;

/** @type {number} */
angular.$http.Response.prototype.status;

/**
 * @param {string=} name
 * @return {string|Object}
 */
angular.$http.Response.prototype.headers = function(name) {};

/** @type {!angular.$http.Config} */
angular.$http.Response.prototype.config;

/**
 * @constructor
 * @extends {angular.$q.Promise.<!angular.$http.Response.<T>>}
 * @override
 * @template T
 */
angular.$http.HttpPromise;

/**
 * @param {?(function(T):
 *             (RESULT|IThenable.<RESULT>|Thenable))=} opt_onFulfilled
 * @param {?(function(*): *)=} opt_onRejected
 * @param {?(function(*): *)=} opt_notifyCallback
 * @return {!angular.$http.HttpPromise.<RESULT>}
 * @template RESULT
 * @override
 */
angular.$http.HttpPromise.prototype.then =
    function(opt_onFulfilled, opt_onRejected, opt_notifyCallback) {};

/**
 * @param {?function(?)} callback
 * @return {!angular.$http.HttpPromise.<T>}
 * @override
 */
angular.$http.HttpPromise.prototype.catch = function(callback) {};

/**
 * @param {?function(?)} callback
 * @return {!angular.$http.HttpPromise.<T>}
 * @override
 */
angular.$http.HttpPromise.prototype.finally = function(callback) {};

/**
 * @param {function(T, number, function(string=):
 *     (string|Object|null), angular.$http.Config)} callback
 * @return {!angular.$http.HttpPromise.<T>} Promise for chaining.
 */
angular.$http.HttpPromise.prototype.success = function(callback) {};

/**
 * @param {function(*, number, function(string=):
 *     (string|Object|null), angular.$http.Config)} callback
 * @return {!angular.$http.HttpPromise.<T>} Promise for chaining.
 */
angular.$http.HttpPromise.prototype.error = function(callback) {};
