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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let _Promise;