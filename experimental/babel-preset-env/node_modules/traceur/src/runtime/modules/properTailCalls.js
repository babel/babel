// Copyright 2015 Traceur Authors.
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

import {getPrivate, setPrivate, createPrivateSymbol} from '../private.js';

var $apply = Function.prototype.call.bind(Function.prototype.apply)

var CONTINUATION_TYPE = Object.create(null);

var isTailRecursiveName = null;

export function createContinuation(operand, thisArg, argsArray) {
  return [CONTINUATION_TYPE, operand, thisArg, argsArray];
}

function isContinuation(object) {
  return object && object[0] === CONTINUATION_TYPE;
}

function $bind(operand, thisArg, args) {
  // args may be an arguments-like object
  var argArray = [thisArg];
  for (var i = 0; i < args.length; i++) {
    argArray[i + 1] = args[i];
  }
  var func = $apply(Function.prototype.bind, operand, argArray);
  return func; // prevent tail call
}

function $construct(func, argArray) {
  var object = new ($bind(func, null, argArray));
  return object; // prevent tail call
}

function isTailRecursive(func) {
  return !!getPrivate(func, isTailRecursiveName);
}

export function tailCall(func, thisArg, argArray) {
  var continuation = argArray[0];
  if (isContinuation(continuation)) {
    continuation = $apply(func, thisArg, continuation[3]);
    return continuation; // prevent tail call
  }
  continuation = createContinuation(func, thisArg, argArray);
  while (true) {
    if (isTailRecursive(func)) {
      continuation = $apply(func, continuation[2], [continuation]);
    } else {
      continuation = $apply(func, continuation[2], continuation[3]);
    }
    if (!isContinuation(continuation)) {
      return continuation;
    }
    func = continuation[1];
  }
}

export function construct() {
  var object;
  if (isTailRecursive(this)) {
    object = $construct(this, [createContinuation(null, null, arguments)]);
  } else  {
    object = $construct(this, arguments);
  }
  return object; // prevent tail call
}

function setupProperTailCalls() {
  isTailRecursiveName = createPrivateSymbol();

  // By 19.2.3.1 and 19.2.3.3, Function.prototype.call and
  // Function.prototype.apply do proper tail calls.

  Function.prototype.call = initTailRecursiveFunction(
      function call(thisArg) {
        var result = tailCall(function (thisArg) {
          var argArray = [];
          for (var i = 1; i < arguments.length; ++i) {
            argArray[i - 1] = arguments[i];
          }
          var continuation = createContinuation(this, thisArg, argArray);
          return continuation; // prevent tail call
        }, this, arguments);
        return result; // prevent tail call
      });

  Function.prototype.apply = initTailRecursiveFunction(
      function apply(thisArg, argArray) {
        var result = tailCall(function (thisArg, argArray) {
          var continuation = createContinuation(this, thisArg, argArray);
          return continuation; // prevent tail call
        }, this, arguments);
        return result; // prevent tail call
      });
}

export function initTailRecursiveFunction(func) {
  if (isTailRecursiveName === null) {
    setupProperTailCalls();
  }
  setPrivate(func, isTailRecursiveName, true);
  return func;
}
