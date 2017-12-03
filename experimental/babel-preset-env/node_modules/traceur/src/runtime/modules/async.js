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

import {createPrivateSymbol, getPrivate, setPrivate} from '../private.js';

var {
  create,
  defineProperty,
} = Object;

var observeName = createPrivateSymbol();

function AsyncGeneratorFunction() {}

function AsyncGeneratorFunctionPrototype() {}

AsyncGeneratorFunction.prototype = AsyncGeneratorFunctionPrototype;

AsyncGeneratorFunctionPrototype.constructor = AsyncGeneratorFunction;

defineProperty(AsyncGeneratorFunctionPrototype, 'constructor',
    {enumerable: false});

class AsyncGeneratorContext {
  constructor(observer) {
    this.decoratedObserver =
        createDecoratedGenerator(observer, () => {
          this.done = true;
        });
    this.done = false;
    this.inReturn = false;
  }
  throw(error) {
    if (!this.inReturn) {
      throw error;
    }
  }
  yield(value) {
    if (this.done) {
      this.inReturn = true;
      throw undefined;
    }
    var result;
    try {
      result = this.decoratedObserver.next(value);
    } catch (e) {
      this.done = true;
      throw e;
    }
    if (result === undefined) {
      return;
    }
    if (result.done) {
      this.done = true;
      this.inReturn = true;
      throw undefined;
    }
    return result.value;
  }
  yieldFor(observable) {
    var ctx = this;
    return observeForEach(
        observable[Symbol.observer].bind(observable),
        function (value) {
          if (ctx.done) {
            this.return();
            return;
          }
          var result;
          try {
            result = ctx.decoratedObserver.next(value);
          } catch (e) {
            ctx.done = true;
            throw e;
          }
          if (result === undefined) {
            return;
          }
          if (result.done) {
            ctx.done = true;
          }
          return result;
        });
  }
}

AsyncGeneratorFunctionPrototype.prototype[Symbol.observer] =
    function (observer) {
      var observe = getPrivate(this, observeName);
      var ctx = new AsyncGeneratorContext(observer);
      schedule(() => observe(ctx)).then(value => {
        if (!ctx.done) {
          ctx.decoratedObserver.return(value);
        }
      }).catch(error => {
        // if ctx.inReturn is true, ctx.done is also true
        if (!ctx.done) {
          ctx.decoratedObserver.throw(error);
        }
      });
      return ctx.decoratedObserver;
    };

defineProperty(AsyncGeneratorFunctionPrototype.prototype, Symbol.observer,
    {enumerable: false});

export function initAsyncGeneratorFunction(functionObject) {
  functionObject.prototype = create(AsyncGeneratorFunctionPrototype.prototype);
  functionObject.__proto__ = AsyncGeneratorFunctionPrototype;
  return functionObject;
}

export function createAsyncGeneratorInstance(observe, functionObject, ...args) {
  var object = create(functionObject.prototype);
  setPrivate(object, observeName, observe);
  return object;
}

export function observeForEach(observe, next) {
  return new Promise((resolve, reject) => {
    var generator = observe({
      next(value) {
        return next.call(generator, value);
      },
      throw(error) {
        reject(error);
      },
      return(value) {
        resolve(value);
      }
    });
  });
}

export function schedule(asyncF) {
  return Promise.resolve().then(asyncF);
}

const generator = Symbol();
const onDone = Symbol();

class DecoratedGenerator {
  constructor(_generator, _onDone) {
    this[generator] = _generator;
    this[onDone] = _onDone;
  }

  next(value) {
    var result = this[generator].next(value);
    if (result !== undefined && result.done) {
      this[onDone].call(this);
    }
    return result;
  }

  throw(error) {
    this[onDone].call(this);
    return this[generator].throw(error);
  }

  return(value) {
    this[onDone].call(this);
    return this[generator].return(value);
  }
}

export function createDecoratedGenerator(generator, onDone) {
  return new DecoratedGenerator(generator, onDone);
}

Array.prototype[Symbol.observer] = function(observer) {
  let done = false;
  let decoratedObserver = createDecoratedGenerator(observer, () => done = true);
  for (var value of this) {
    decoratedObserver.next(value);
    if (done) {
      return;
    }
  }
  decoratedObserver.return();
  return decoratedObserver;
};

defineProperty(Array.prototype, Symbol.observer, {enumerable: false});
