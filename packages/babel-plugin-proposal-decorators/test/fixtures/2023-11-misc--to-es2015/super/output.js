var _Test, _TestChild;
let _init_foo, _init_extra_foo, _init_bar, _init_extra_bar;
function decorate() {
  return function (target, context) {};
}
var _A = /*#__PURE__*/new WeakMap();
class Test {
  get foo() {
    return babelHelpers.classPrivateFieldGet2(_A, this);
  }
  set foo(v) {
    babelHelpers.classPrivateFieldSet2(_A, this, v);
  }
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _A, _init_foo(this, 42));
    _init_extra_foo(this);
    console.log('hello');
  }
}
_Test = Test;
[_init_foo, _init_extra_foo] = babelHelpers.applyDecs2311(_Test, [], [[decorate(), 1, "foo"]]).e;
new Test();
var _A2 = /*#__PURE__*/new WeakMap();
class TestChild extends Test {
  get bar() {
    return babelHelpers.classPrivateFieldGet2(_A2, this);
  }
  set bar(v) {
    babelHelpers.classPrivateFieldSet2(_A2, this, v);
  }
  constructor() {
    (super(), babelHelpers.classPrivateFieldInitSpec(this, _A2, _init_bar(this, 1)), this), _init_extra_bar(this);
  }
}
_TestChild = TestChild;
[_init_bar, _init_extra_bar] = babelHelpers.applyDecs2311(_TestChild, [], [[decorate(), 1, "bar"]], 0, void 0, Test).e;
const r = new TestChild();
