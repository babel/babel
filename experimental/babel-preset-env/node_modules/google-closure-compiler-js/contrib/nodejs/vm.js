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
 * @fileoverview Definitions for node's vm module.
 * @see http://nodejs.org/api/vm.html
 * @see https://github.com/joyent/node/blob/master/lib/vm.js
 */

/**
 * @const
 */
var vm = {};

/**
 * @constructor
 */
vm.Context = function() {}; // Does not really exist

/**
 * @param {string} code
 * @param {string=} filename
 */
vm.runInThisContext;

/**
 * @param {string} code
 * @param {Object.<string,*>=} sandbox
 * @param {string=} filename
 * @return {void}
 */
vm.runInNewContext;

/**
 * @param {string} code
 * @param {vm.Context} context
 * @param {string=} filename
 * @return {void}
 */
vm.runInContext;

/**
 * @param {Object.<string,*>=} initSandbox
 * @return {vm.Context}
 * @nosideeffects
 */
vm.createContext;

/**
 * @constructor
 */
vm.Script = function() {};

/**
 * @param {string} code
 * @param {string=} filename
 * @return {vm.Script}
 * @nosideeffects
 */
vm.createScript;

/**
 * @return {void}
 */
vm.Script.prototype.runInThisContext;

/**
 * @param {Object.<string,*>=} sandbox
 * @return {void}
 */
vm.Script.prototype.runInNewContext;

module.exports = vm;
