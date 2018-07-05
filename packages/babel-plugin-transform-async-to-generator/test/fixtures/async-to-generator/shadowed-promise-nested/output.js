function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

let _Promise;

function _foo() {
  _foo = _asyncToGenerator(function* foo() {
    let Promise;
    yield bar();

    function _bar() {
      _bar = _asyncToGenerator(function* bar() {
        return Promise.resolve();
      });
      return _bar.apply(this, arguments);
    }

    function bar() {
      return _bar.apply(this, arguments);
    }
  });
  return _foo.apply(this, arguments);
}

function foo() {
  return _foo.apply(this, arguments);
}
