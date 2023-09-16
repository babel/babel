var _myAsyncMethod = /*#__PURE__*/new WeakMap();
class MyClass {
  constructor() {
    var _this = this;
    babelHelpers.classPrivateFieldInitSpec(this, _myAsyncMethod, {
      writable: true,
      value: function () {
        var _ref = babelHelpers.asyncToGenerator(function* () {
          console.log(_this);
        });
        return function value() {
          return _ref.apply(this, arguments);
        };
      }()
    });
  }
}
var _myAsyncMethod2 = /*#__PURE__*/new WeakMap();
(class MyClass2 {
  constructor() {
    var _this2 = this;
    babelHelpers.classPrivateFieldInitSpec(this, _myAsyncMethod2, {
      writable: true,
      value: function () {
        var _ref2 = babelHelpers.asyncToGenerator(function* () {
          console.log(_this2);
        });
        return function value() {
          return _ref2.apply(this, arguments);
        };
      }()
    });
  }
});
var _myAsyncMethod3 = /*#__PURE__*/new WeakMap();
export default class MyClass3 {
  constructor() {
    var _this3 = this;
    babelHelpers.classPrivateFieldInitSpec(this, _myAsyncMethod3, {
      writable: true,
      value: function () {
        var _ref3 = babelHelpers.asyncToGenerator(function* () {
          console.log(_this3);
        });
        return function value() {
          return _ref3.apply(this, arguments);
        };
      }()
    });
  }
}
