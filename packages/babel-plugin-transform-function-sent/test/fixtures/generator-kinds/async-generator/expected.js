let foo = (() => {
  var _ref = _asyncGenerator.wrap(_skipFirstGeneratorNext(function* () {
    let _functionSent = yield;

    _functionSent = yield _asyncGenerator.await(_functionSent);
  }));

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();

function _skipFirstGeneratorNext(fn) { return function () { var it = fn.apply(this, arguments); it.next(); return it; }; }

function AwaitValue(value) { this.value = value; }

function AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; if (value instanceof AwaitValue) { Promise.resolve(value.value).then(function (arg) { resume("next", arg); }, function (arg) { resume("throw", arg); }); } else { settle(result.done ? "return" : "normal", result.value); } } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

var _asyncGenerator = { wrap: function (fn) { return function () { return new AsyncGenerator(fn.apply(this, arguments)); }; }, await: function (value) { return new AwaitValue(value); } };
