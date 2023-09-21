var _myAsyncMethod = /*#__PURE__*/new WeakMap();
class MyClass {
  constructor() {
    var _this = this;
    babelHelpers.classPrivateFieldInitSpec(this, _myAsyncMethod, {
      writable: true,
      value: function value() {
        return babelHelpers.callAsync(function* () {
          console.log(_this);
        }, this, arguments);
      }
    });
  }
}
var _myAsyncMethod2 = /*#__PURE__*/new WeakMap();
(class MyClass2 {
  constructor() {
    var _this2 = this;
    babelHelpers.classPrivateFieldInitSpec(this, _myAsyncMethod2, {
      writable: true,
      value: function value() {
        return babelHelpers.callAsync(function* () {
          console.log(_this2);
        }, this, arguments);
      }
    });
  }
});
var _myAsyncMethod3 = /*#__PURE__*/new WeakMap();
export default class MyClass3 {
  constructor() {
    var _this3 = this;
    babelHelpers.classPrivateFieldInitSpec(this, _myAsyncMethod3, {
      writable: true,
      value: function value() {
        return babelHelpers.callAsync(function* () {
          console.log(_this3);
        }, this, arguments);
      }
    });
  }
}
