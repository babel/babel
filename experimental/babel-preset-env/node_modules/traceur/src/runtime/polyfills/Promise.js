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

// Based on:
//   https://github.com/rossberg-chromium/js-promise/blob/master/promise.js
//   https://github.com/slightlyoff/Promises/blob/master/src/Promise.js
//   https://github.com/domenic/promises-unwrapping/blob/master/testable-implementation.js

import async from '../../../node_modules/rsvp/lib/rsvp/asap.js';
import {isObject, registerPolyfill} from './utils.js';
import {createPrivateSymbol, getPrivate, setPrivate} from '../private.js';

// Status values: 0 = pending, +1 = resolved, -1 = rejected

var promiseRaw = {};

function isPromise(x) {
  return x && typeof x === 'object' && x.status_ !== undefined;
}

function idResolveHandler(x) {
  return x;
}

function idRejectHandler(x) {
  throw x;
}

// Simple chaining (a.k.a. flatMap).
function chain(promise,
               onResolve = idResolveHandler,
               onReject = idRejectHandler) {
  var deferred = getDeferred(promise.constructor);
  switch (promise.status_) {
    case undefined:
      throw TypeError;
    case 0:
      promise.onResolve_.push(onResolve, deferred);
      promise.onReject_.push(onReject, deferred);
      break;
    case +1:
      promiseEnqueue(promise.value_, [onResolve, deferred]);
      break;
    case -1:
      promiseEnqueue(promise.value_, [onReject, deferred]);
      break;
  }
  return deferred.promise;
}

function getDeferred(C) {
  if (this === $Promise) {
    // Optimized case, avoid extra closure.
    var promise = promiseInit(new $Promise(promiseRaw));
    return {
      promise: promise,
      resolve: (x) => { promiseResolve(promise, x) },
      reject: (r) => { promiseReject(promise, r) }
    };
  } else {
    var result = {};
    result.promise = new C((resolve, reject) => {
      result.resolve = resolve;
      result.reject = reject;
    });
    return result;
  }
}

function promiseSet(promise, status, value, onResolve, onReject) {
  promise.status_ = status;
  promise.value_ = value;
  promise.onResolve_ = onResolve;
  promise.onReject_ = onReject;
  return promise;
}

function promiseInit(promise) {
  return promiseSet(promise, 0, undefined, [], []);
}

export class Promise {
  constructor(resolver) {
    if (resolver === promiseRaw)
      return;
    if (typeof resolver !== 'function')
      throw new TypeError;
    var promise = promiseInit(this);
    try {
      resolver((x) => { promiseResolve(promise, x) },
               (r) => { promiseReject(promise, r) });
    } catch (e) {
      promiseReject(promise, e);
    }
  }

  catch(onReject) {
    return this.then(undefined, onReject)
  }

  // Extended functionality for multi-unwrapping chaining and coercive 'then'.
  then(onResolve, onReject) {
    if (typeof onResolve !== 'function') onResolve = idResolveHandler;
    if (typeof onReject !== 'function') onReject = idRejectHandler;
    var that = this;
    var constructor = this.constructor;
    return chain(this, function(x) {
      x = promiseCoerce(constructor, x);
      return x === that ? onReject(new TypeError) :
          isPromise(x) ? x.then(onResolve, onReject) : onResolve(x)
    }, onReject);
  }

  // Convenience.

  static resolve(x) {
    if (this === $Promise) {
      if (isPromise(x)) {
        return x;
      }
      // Optimized case, avoid extra closure.
      return promiseSet(new $Promise(promiseRaw), +1, x);
    } else {
      return new this(function(resolve, reject) { resolve(x) });
    }
  }

  static reject(r) {
    if (this === $Promise) {
      // Optimized case, avoid extra closure.
      return promiseSet(new $Promise(promiseRaw), -1, r);
    } else {
      return new this((resolve, reject) => { reject(r) });
    }
  }

  // Combinators.

  static all(values) {
    var deferred = getDeferred(this);
    var resolutions = [];
    try {
      var count = 0;
      var i = 0;
      for (var value of values) {
        var countdownFunction = makeCountdownFunction(i);
        this.resolve(value).then(
            countdownFunction,
            (r) => { deferred.reject(r); });
        ++i
        ++count;
      }
      // iterable must be empty as otherwise the count wouldn't be decreased
      // until next tick at least
      if (count === 0) {
        deferred.resolve(resolutions);
      }

      function makeCountdownFunction(i) {
        return (x) => {
          resolutions[i] = x;
          if (--count === 0)
            deferred.resolve(resolutions);
        }
      }
    } catch (e) {
      deferred.reject(e);
    }
    return deferred.promise;
  }

  static race(values) {
    var deferred = getDeferred(this);
    try {
      // TODO(arv): values should be an iterable
      for (var i = 0; i < values.length; i++) {
        this.resolve(values[i]).then(
            (x) => { deferred.resolve(x); },
            (r) => { deferred.reject(r); });
      }
    } catch (e) {
      deferred.reject(e);
    }
    return deferred.promise;
  }
}

var $Promise = Promise;
var $PromiseReject = $Promise.reject;

function promiseResolve(promise, x) {
  promiseDone(promise, +1, x, promise.onResolve_);
}

function promiseReject(promise, r) {
  promiseDone(promise, -1, r, promise.onReject_);
}

function promiseDone(promise, status, value, reactions) {
  if (promise.status_ !== 0)
    return;
  promiseEnqueue(value, reactions);
  promiseSet(promise, status, value);
}

function promiseEnqueue(value, tasks) {
  async(() => {
    for (var i = 0; i < tasks.length; i += 2) {
      promiseHandle(value, tasks[i], tasks[i + 1])
    }
  });
}

function promiseHandle(value, handler, deferred) {
  try {
    var result = handler(value);
    if (result === deferred.promise)
      throw new TypeError;
    else if (isPromise(result))
      chain(result, deferred.resolve, deferred.reject);
    else
      deferred.resolve(result);
  } catch (e) {
    // TODO(arv): perhaps log uncaught exceptions below.
    try { deferred.reject(e) } catch(e) {}
  }
}

const thenableSymbol = createPrivateSymbol();

function promiseCoerce(constructor, x) {
  if (!isPromise(x) && isObject(x)) {
    var then;
    try {
      then = x.then;
    } catch (r) {
      var promise = $PromiseReject.call(constructor, r);
      setPrivate(x, thenableSymbol, promise);
      return promise;
    }
    if (typeof then === 'function') {
      var p = getPrivate(x, thenableSymbol);
      if (p) {
        return p;
      } else {
        var deferred = getDeferred(constructor);
        setPrivate(x, thenableSymbol, deferred.promise);
        try {
          then.call(x, deferred.resolve, deferred.reject);
        } catch (r) {
          deferred.reject(r);
        }
        return deferred.promise;
      }
    }
  }
  return x;
}

export function polyfillPromise(global) {
  if (!global.Promise)
    global.Promise = Promise;
}

registerPolyfill(polyfillPromise);
