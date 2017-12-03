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
 * Left here for backwards compatibility, but no longer used.
 *
 * @typedef {function((string|Object), number,
 *     function(string=): (string|Object|null), angular.$http.Config)}
 */
angular.HttpCallback;

/**
 * @interface
 * @template T
 */
angular.$http.Response = function() {};

/** @type {T} */
angular.$http.Response.prototype.data;

/** @type {number} */
angular.$http.Response.prototype.status;

/** @type {string} */
angular.$http.Response.prototype.statusText;

/**
 * @param {string=} name
 * @return {string|Object}
 */
angular.$http.Response.prototype.headers = function(name) {};

/** @type {!angular.$http.Config} */
angular.$http.Response.prototype.config;

/**
 * @interface
 * @extends {angular.$q.Promise.<!angular.$http.Response.<T>>}
 * @template T
 */
angular.$http.HttpPromise = function() {};
