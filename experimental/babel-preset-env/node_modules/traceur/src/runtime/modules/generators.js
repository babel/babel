// Copyright 2014 Traceur Authors.
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

var $TypeError = TypeError;
var {
  create,
  defineProperties,
  defineProperty,
} = Object;

function nonEnum(value) {
  return {
    configurable: true,
    enumerable: false,
    value: value,
    writable: true
  };
}

// Generator states. Terminology roughly matches that of
//   http://wiki.ecmascript.org/doku.php?id=harmony:generators
// Since 'state' is already taken, use 'GState' instead to denote what's
// referred to as "G.[[State]]" on that page.
var ST_NEWBORN = 0;
var ST_EXECUTING = 1;
var ST_SUSPENDED = 2;
var ST_CLOSED = 3;

var END_STATE = -2;
var RETHROW_STATE = -3;


function getInternalError(state) {
  return new Error('Traceur compiler bug: invalid state in state machine: ' +
                    state);
}

// The following unique object serves as a non-catchable exception raised by
// the implementation of Generator.prototype.return
var RETURN_SENTINEL = {};

function GeneratorContext() {
  this.state = 0;
  this.GState = ST_NEWBORN;
  this.storedException = undefined;
  this.finallyFallThrough = undefined;
  this.sent_ = undefined;
  this.returnValue = undefined;
  this.oldReturnValue = undefined;
  this.tryStack_ = [];
}
GeneratorContext.prototype = {
  pushTry: function(catchState, finallyState) {
    if (finallyState !== null) {
      var finallyFallThrough = null;
      for (var i = this.tryStack_.length - 1; i >= 0; i--) {
        if (this.tryStack_[i].catch !== undefined) {
          finallyFallThrough = this.tryStack_[i].catch;
          break;
        }
      }
      if (finallyFallThrough === null)
        finallyFallThrough = RETHROW_STATE;

      this.tryStack_.push({
        finally: finallyState,
        finallyFallThrough: finallyFallThrough
      });
    }

    if (catchState !== null) {
      this.tryStack_.push({catch: catchState});
    }
  },
  popTry: function() {
    this.tryStack_.pop();
  },
  maybeUncatchable: function () {
    if (this.storedException === RETURN_SENTINEL) {
      throw RETURN_SENTINEL;
    }
  },
  get sent() {
    this.maybeThrow();
    return this.sent_;
  },
  set sent(v) {
    this.sent_ = v;
  },
  get sentIgnoreThrow() {
    return this.sent_;
  },
  maybeThrow: function() {
    if (this.action === 'throw') {
      this.action = 'next';
      throw this.sent_;
    }
  },
  end: function() {
    switch (this.state) {
      case END_STATE:
        return this;
      case RETHROW_STATE:
        throw this.storedException;
      default:
        throw getInternalError(this.state);
    }
  },
  handleException: function(ex) {
    this.GState = ST_CLOSED;
    this.state = END_STATE;
    throw ex;
  },
  wrapYieldStar: function(iterator) {
    var ctx = this;
    return {
      next: function (v) {
        return iterator.next(v);
      },
      throw: function (e) {
        var result;
        if (e === RETURN_SENTINEL) {
          if (iterator.return) {
            result = iterator.return(ctx.returnValue);
            if (!result.done) {
              ctx.returnValue = ctx.oldReturnValue;
              return result;
            }
            ctx.returnValue = result.value;
          }
          throw e;
        }
        if (iterator.throw) {
          return iterator.throw(e);
        }
        // 14.4 "YieldExpression: yield * AssignmentExpression" 1.6.b.iv
        iterator.return && iterator.return();
        throw $TypeError('Inner iterator does not have a throw method');
      }
    };
  }
};

function nextOrThrow(ctx, moveNext, action, x) {
  switch (ctx.GState) {
    case ST_EXECUTING:
      throw new Error(`"${action}" on executing generator`);

    case ST_CLOSED:
      if (action == 'next') {
        return {
          value: undefined,
          done: true
        };
      }
      if (x === RETURN_SENTINEL) {
        return {
          value: ctx.returnValue,
          done: true
        };
      }
      throw x;

    case ST_NEWBORN:
      if (action === 'throw') {
        ctx.GState = ST_CLOSED;
        if (x === RETURN_SENTINEL) {
          return {value: ctx.returnValue, done: true};
        }
        throw x;
      }
      if (x !== undefined)
        throw $TypeError('Sent value to newborn generator');
      // fall through

    case ST_SUSPENDED:
      ctx.GState = ST_EXECUTING;
      ctx.action = action;
      ctx.sent = x;
      var value;
      try {
        value = moveNext(ctx);
      } catch (ex) {
        if (ex === RETURN_SENTINEL) {
          value = ctx;
        } else {
          throw ex;
        }
      }
      var done = value === ctx;
      if (done)
        value = ctx.returnValue;
      ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
      return {value: value, done: done};
  }
}

var ctxName = createPrivateSymbol();
var moveNextName = createPrivateSymbol();

function GeneratorFunction() {}

function GeneratorFunctionPrototype() {}

GeneratorFunction.prototype = GeneratorFunctionPrototype;

defineProperty(GeneratorFunctionPrototype, 'constructor',
    nonEnum(GeneratorFunction));

GeneratorFunctionPrototype.prototype = {
  constructor: GeneratorFunctionPrototype,
  next: function(v) {
    return nextOrThrow(getPrivate(this, ctxName), getPrivate(this, moveNextName), 'next', v);
  },
  throw: function(v) {
    return nextOrThrow(getPrivate(this, ctxName), getPrivate(this, moveNextName), 'throw', v);
  },
  return: function (v) {
    let ctx = getPrivate(this, ctxName);
    ctx.oldReturnValue = ctx.returnValue;
    ctx.returnValue = v;
    return nextOrThrow(ctx, getPrivate(this, moveNextName), 'throw', RETURN_SENTINEL);
  }
};

defineProperties(GeneratorFunctionPrototype.prototype, {
  constructor: {enumerable: false},
  next: {enumerable: false},
  throw: {enumerable: false},
  return: {enumerable: false}
});

Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator,
    nonEnum(function() {
      return this;
    }));

export function createGeneratorInstance(innerFunction, functionObject, self) {
  // TODO(arv): Use [[GeneratorState]]
  var moveNext = getMoveNext(innerFunction, self);
  var ctx = new GeneratorContext();

  var object = create(functionObject.prototype);
  setPrivate(object, ctxName, ctx);
  setPrivate(object, moveNextName, moveNext);
  return object;
}

export function initGeneratorFunction(functionObject) {
  functionObject.prototype = create(GeneratorFunctionPrototype.prototype);
  functionObject.__proto__ = GeneratorFunctionPrototype;
  return functionObject;
}

function AsyncFunctionContext() {
  GeneratorContext.call(this);
  this.err = undefined;
  var ctx = this;
  ctx.result = new Promise(function(resolve, reject) {
    ctx.resolve = resolve;
    ctx.reject = reject;
  });
}
AsyncFunctionContext.prototype = create(GeneratorContext.prototype);
AsyncFunctionContext.prototype.end = function() {
  switch (this.state) {
    case END_STATE:
      this.resolve(this.returnValue);
      break;
    case RETHROW_STATE:
      this.reject(this.storedException);
      break;
    default:
      this.reject(getInternalError(this.state));
  }
};
AsyncFunctionContext.prototype.handleException = function() {
  this.state = RETHROW_STATE;
};

export function asyncWrap(innerFunction, self) {
  var moveNext = getMoveNext(innerFunction, self);
  var ctx = new AsyncFunctionContext();
  ctx.createCallback = function(newState) {
    return function (value) {
      ctx.state = newState;
      ctx.value = value;
      moveNext(ctx);
    };
  }

  ctx.errback = function(err) {
    handleCatch(ctx, err);
    moveNext(ctx);
  };

  moveNext(ctx);
  return ctx.result;
}

function getMoveNext(innerFunction, self) {
  return function(ctx) {
    while (true) {
      try {
        return innerFunction.call(self, ctx);
      } catch (ex) {
        handleCatch(ctx, ex);
      }
    }
  };
}

function handleCatch(ctx, ex) {
  ctx.storedException = ex;
  var last = ctx.tryStack_[ctx.tryStack_.length - 1];
  if (!last) {
    ctx.handleException(ex);
    return;
  }

  ctx.state = last.catch !== undefined ? last.catch : last.finally;

  if (last.finallyFallThrough !== undefined)
    ctx.finallyFallThrough = last.finallyFallThrough;
}
