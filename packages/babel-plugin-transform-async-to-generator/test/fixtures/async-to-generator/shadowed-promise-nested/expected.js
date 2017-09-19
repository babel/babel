let foo = (() => {
  var _ref = _asyncToGenerator(function* () {
    let bar = (() => {
      var _ref2 = _asyncToGenerator(function* () {
        return Promise.resolve();
      });

      return function bar() {
        return _ref2.apply(this, arguments);
      };
    })();

    let Promise;
    yield bar();
  });

  return function foo() {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function (...args) { return new Promise((resolve, reject) => { const gen = fn.apply(this, args); function step(key, arg) { let info; try { info = gen[key](arg); } catch (error) { reject(error); return; } if (info.done) { resolve(info.value); } else { Promise.resolve(info.value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

let _Promise;
