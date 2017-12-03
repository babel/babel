// Copyright 2013 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Wrap a single async function to make the callback optional and hook it to
 * trigger reject/resolve of the Promise, which it returns (this ignores the
 * async function's return value). This enables the use of await with the
 * wrapped function.
 *
 * @param {Function} fn Function to wrap.
 * @param {boolean} firstArg True if the async callback is the first argument.
 * @return {Function}
 */
function wrapFunction(fn, firstArg) {
  return function() {
    var resolve, reject;
    var promise = new Promise(function(res, rej) {
      resolve = res;
      reject = rej;
    });

    var args = [].slice.call(arguments);
    var originalCallback = args[firstArg ? 0 : args.length - 1];

    function callback(err, value) {
      if (originalCallback)
        originalCallback.apply(this, arguments);

      if (err)
        reject(err);
      else
        resolve(value);
    }

    if (typeof originalCallback !== 'function') {
      // Callback wasn't provided to the async function, add the custom one.
      originalCallback = null;
      if (firstArg)
        args.unshift(callback);
      else
        args.push(callback);
    } else {
      // Callback was provided to the async function, replace it.
      args[firstArg ? 0 : args.length - 1] = callback;
    }

    fn.apply(this, args);

    return promise;
  };
}

/**
 * Wrap async functions in a module to enable the use of await.
 * If no function name array is provided, every function with a fnSync
 * variant will be wrapped.
 *
 * @param {string|Object} module The exports of the module or a string that
 *     will be passed to require to get the module.
 * @param {Array.<string>} functions Function names to wrap.
 * @return {object} The module.
 */
function wrapModule(module, functions) {
  if (typeof module === 'string')
    module = require(module);

  if (!functions) {
    for (var k in module) {
      // HACK: wrap all functions with a fnSync variant.
      if (typeof module[k] === 'function' &&
          typeof module[k + 'Sync'] === 'function')
        module[k] = wrapFunction(module[k]);
    }
  } else {
    for (var i = 0, k; i < functions.length; i++) {
      var k = functions[i];
      module[k] = wrapFunction(module[k]);
    }
  }

  return module;
}

/**
 * Wrap async functions in Node.js to enable the use of await.
 *
 * @return {void}
 */
function wrap() {
  // TODO: find and wrap everything that needs to be wrapped.
  wrapModule('fs');
  process.nextTick = wrapFunction(process.nextTick, true);
  // FIXME: this would ignore the return value, making it impossible to cancel
  // the timeout without implementing a cancel method and using it everywhere.
  //global.setTimeout = wrapFunction(setTimeout, true);
}
exports.wrap = wrap;
