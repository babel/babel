var _nullish = /*#__PURE__*/new WeakMap();
var _and = /*#__PURE__*/new WeakMap();
var _or = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _nullish, 0);
    babelHelpers.classPrivateFieldInitSpec(this, _and, 0);
    babelHelpers.classPrivateFieldInitSpec(this, _or, 0);
  }
  self() {
    return this;
  }
  test() {
    var _this$self;
    babelHelpers.classPrivateFieldGet2(this, _nullish) ?? babelHelpers.classPrivateFieldSet2(this, _nullish, 42);
    babelHelpers.classPrivateFieldGet2(this, _and) && babelHelpers.classPrivateFieldSet2(this, _and, 0);
    babelHelpers.classPrivateFieldGet2(this, _or) || babelHelpers.classPrivateFieldSet2(this, _or, 0);
    babelHelpers.classPrivateFieldGet2(_this$self = this.self(), _nullish) ?? babelHelpers.classPrivateFieldSet2(_this$self, _nullish, 42);
  }
}
