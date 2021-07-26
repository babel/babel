var _nullish = /*#__PURE__*/new WeakMap(),
    _and = /*#__PURE__*/new WeakMap(),
    _or = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _nullish.set(this, 0);

    _and.set(this, 0);

    _or.set(this, 0);
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
