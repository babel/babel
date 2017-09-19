let foo = (() => {
  var _ref = _asyncGenerator.wrap(_skipFirstGeneratorNext(function* () {
    let _functionSent = yield;

    _functionSent = yield _asyncGenerator.await(_functionSent);
  }));

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();

function _skipFirstGeneratorNext(fn) { return function (...args) { const it = fn.apply(this, args); it.next(); return it; }; }

function AwaitValue(value) { this.value = value; }

const send = (state, key, arg) => new Promise((resolve, reject) => { const request = { key, arg, resolve, reject, next: null }; if (state.back) { state.back = state.back.next = request; } else { state.front = state.back = request; resume(state, key, arg); } });

const resume = (state, key, arg) => { try { const result = state.gen[key](arg); const { value } = result; if (value instanceof AwaitValue) { Promise.resolve(value.value).then(arg => resume(state, "next", arg), arg => resume(state, "throw", arg)); } else { settle(state, result.done ? "return" : "normal", result.value); } } catch (err) { settle(state, "throw", err); } };

const settle = (state, type, value) => { switch (type) { case "return": state.front.resolve({ value, done: true }); break; case "throw": state.front.reject(value); break; default: state.front.resolve({ value, done: false }); break; } state.front = state.front.next; if (state.front) { resume(state, state.front.key, state.front.arg); } else { state.back = null; } };

class AsyncGenerator { constructor(gen) { this._state = { gen, front: null, back: null }; this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } } [typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"]() { return this; } next(arg) { return this._invoke(this._state, "next", arg); } throw(arg) { return this._invoke(this._state, "throw", arg); } return(arg) { return this._invoke(this._state, "return", arg); } }

var _asyncGenerator = { wrap: fn => (...args) => new AsyncGenerator(fn.apply(this, args)), await: value => new AwaitValue(value) };
