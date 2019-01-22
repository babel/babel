function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function myFunction(_x) {
  return _myFunction.apply(this, arguments);
}

function _myFunction() {
  _myFunction = _asyncToGenerator(function* (n) {
    const _pipe = n;

    const _pipe2 = Math.abs(_pipe);

    const _pipe3 = Promise.resolve(_pipe2);

    return yield _pipe3;
  });
  return _myFunction.apply(this, arguments);
}
