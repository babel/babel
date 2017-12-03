/*
 * Copyright 2015 The Closure Compiler Authors.
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
 * @fileoverview Extra externs for Jasmine when using Angular.
 *
 * Depends on both the angular-1.x-mocks.js and Jasmine 2.0 externs.
 *
 * @externs
 */


/**
 * Provided by angular-mocks.js.
 * @type {angular.$injector}
 */
jasmine.Spec.prototype.$injector;


/**
 * Provided by angular-mocks.js.
 * @param {...(Function|Array<string|Function>)} var_args
 */
function inject(var_args) {}


/**
 * Provided by angular-mocks.js.
 * @param {...(string|Function|Array<string|Function>)} var_args
 * @suppress {checkTypes}
 */
function module(var_args) {}
