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
    babelHelpers.classPrivateFieldGet2(_nullish, this) ?? babelHelpers.classPrivateFieldSet2(_nullish, this, 42);
    babelHelpers.classPrivateFieldGet2(_and, this) && babelHelpers.classPrivateFieldSet2(_and, this, 0);
    babelHelpers.classPrivateFieldGet2(_or, this) || babelHelpers.classPrivateFieldSet2(_or, this, 0);
    babelHelpers.classPrivateFieldGet2(_nullish, _this$self = this.self()) ?? babelHelpers.classPrivateFieldSet2(_nullish, _this$self, 42);
  }
}
