var _myAsyncMethod = /*#__PURE__*/new WeakMap();
class MyClass {
  constructor() {
    var _this = this,
      _ref;
    babelHelpers.classPrivateFieldInitSpec(this, _myAsyncMethod, {
      writable: true,
      value: function value() {
        return (_ref = _ref || babelHelpers.asyncToGenerator(function* () {
          console.log(_this);
        })).apply(this, arguments);
      }
    });
  }
}
var _myAsyncMethod2 = /*#__PURE__*/new WeakMap();
(class MyClass2 {
  constructor() {
    var _this2 = this,
      _ref2;
    babelHelpers.classPrivateFieldInitSpec(this, _myAsyncMethod2, {
      writable: true,
      value: function value() {
        return (_ref2 = _ref2 || babelHelpers.asyncToGenerator(function* () {
          console.log(_this2);
        })).apply(this, arguments);
      }
    });
  }
});
var _myAsyncMethod3 = /*#__PURE__*/new WeakMap();
export default class MyClass3 {
  constructor() {
    var _this3 = this,
      _ref3;
    babelHelpers.classPrivateFieldInitSpec(this, _myAsyncMethod3, {
      writable: true,
      value: function value() {
        return (_ref3 = _ref3 || babelHelpers.asyncToGenerator(function* () {
          console.log(_this3);
        })).apply(this, arguments);
      }
    });
  }
}
