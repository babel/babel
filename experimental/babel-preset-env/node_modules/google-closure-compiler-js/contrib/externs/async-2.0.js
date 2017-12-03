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
 * @fileoverview Externs definitions for the Async library, 2.0 branch.
 *
 * Note that this file is far from complete.
 *
 * @externs
 * @see http://caolan.github.io/async/
 */

var async;

/**
 * @param {!Array<!Function>} tasks
 * @param {!Function=} opt_callback
 */
async.series = function(tasks, opt_callback) {};

/**
 * @param {!Function} callback
 * @return {!Function}
 */
async.wrapSync = function(callback) {};
