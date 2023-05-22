var _nullish = /*#__PURE__*/new WeakMap();
var _and = /*#__PURE__*/new WeakMap();
var _or = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _nullish, {
      writable: true,
      value: 0
    });
    babelHelpers.classPrivateFieldInitSpec(this, _and, {
      writable: true,
      value: 0
    });
    babelHelpers.classPrivateFieldInitSpec(this, _or, {
      writable: true,
      value: 0
    });
  }
  self() {
    return this;
  }
  test() {
    var _this$self;
    babelHelpers.classPrivateFieldGet(this, _nullish) ?? babelHelpers.classPrivateFieldSet(this, _nullish, 42);
    babelHelpers.classPrivateFieldGet(this, _and) && babelHelpers.classPrivateFieldSet(this, _and, 0);
    babelHelpers.classPrivateFieldGet(this, _or) || babelHelpers.classPrivateFieldSet(this, _or, 0);
    babelHelpers.classPrivateFieldGet(_this$self = this.self(), _nullish) ?? babelHelpers.classPrivateFieldSet(_this$self, _nullish, 42);
  }
}
