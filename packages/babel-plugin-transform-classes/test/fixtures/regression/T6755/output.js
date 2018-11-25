function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Example =
/*#__PURE__*/
function () {
  "use strict";

  function Example() {}

  var _proto = Example.prototype;

  _proto.test1 =
  /*#__PURE__*/
  function () {
    var _test = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Promise.resolve(2);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function test1() {
      return _test.apply(this, arguments);
    }

    return test1;
  }();

  _proto.test2 =
  /*#__PURE__*/
  regeneratorRuntime.mark(function test2() {
    return regeneratorRuntime.wrap(function test2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return 3;

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, test2, this);
  });
  return Example;
}();
