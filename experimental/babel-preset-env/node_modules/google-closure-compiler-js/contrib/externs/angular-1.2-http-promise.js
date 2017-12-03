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
 * @fileoverview AngularJS' HTTP promises.
 * @see https://docs.angularjs.org/api/ng/service/$http
 * @externs
 */

/**
 * @typedef {function((string|Object), number,
 *     function(string=): (string|Object|null), angular.$http.Config)}
 */
angular.HttpCallback;

/**
 * @typedef {{
 *   data: (string|Object),
 *   status: number,
 *   headers: function(string=): (string|Object),
 *   config: !angular.$http.Config
 *   }}
 */
angular.$http.Response;

/**
 * @typedef {{
 *   then: function(
 *       ?function(!angular.$http.Response),
 *       ?function(!angular.$http.Response)=,
 *       ?function(!angular.$http.Response)=): !angular.$http.HttpPromise,
 *   catch: function(
 *       ?function(!angular.$http.Response)): !angular.$http.HttpPromise,
 *   finally: function(
 *       ?function(!angular.$http.Response)): !angular.$http.HttpPromise,
 *   success: function(!angular.HttpCallback): !angular.$http.HttpPromise,
 *   error: function(!angular.HttpCallback): !angular.$http.HttpPromise
 * }}
 */
angular.$http.HttpPromise;

/**
 * @param {?function(!angular.$http.Response)} successCallback
 * @param {?function(!angular.$http.Response)=} opt_errorCallback
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.HttpPromise.then = function(
    successCallback, opt_errorCallback) {};

/**
 * @param {?function(!angular.$http.Response)} callback
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.HttpPromise.catch = function(callback) {};

/**
 * @param {?function(!angular.$http.Response)} callback
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.HttpPromise.finally = function(callback) {};

/**
 * @param {angular.HttpCallback} callback
 * @return {!angular.$http.HttpPromise} Promise for chaining.
 */
angular.$http.HttpPromise.success = function(callback) {};

/**
 * @param {angular.HttpCallback} callback
 * @return {!angular.$http.HttpPromise} Promise for chaining.
 */
angular.$http.HttpPromise.error = function(callback) {};
