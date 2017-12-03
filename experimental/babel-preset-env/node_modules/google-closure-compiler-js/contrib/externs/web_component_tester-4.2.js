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
 * @fileoverview Externs definitions for web-component-tester, 4.2 branch.
 *
 * @externs
 * @see https://github.com/Polymer/web-component-tester
 */

/**
 * Waits for queued tasks to finish, then calls the callback.
 * @param {!Function} cb
 */
var flush = function(cb) {};

/**
 * @param {string} tag
 * @return {{with: function(string)}}
 */
var replace = function(tag) {};

/**
 * @param {string} tag
 * @param {!Object} impl
 */
var stub = function(tag, impl) {};

/**
 * Shorthand for `document.getElementById(name).create(model)`. It is to be used
 * with the `<text-fixture>` Polymer element.
 * @param {string} name
 * @param {!Object=} opt_model
 * @return {!Element}
 */
var fixture = function(name, opt_model) {};

/**
 * @param {string} fixtureId
 * @param {!Array<string>=} ignoredRules
 */
var a11ySuite = function(fixtureId, ignoredRules) {};
