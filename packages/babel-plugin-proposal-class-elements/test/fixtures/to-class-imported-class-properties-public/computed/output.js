var _one, _ref, _undefined, _computed, _computed2, _ref2, _ref3, _baz, _ref4;

var foo = "foo";

var bar = () => {};

var four = 4;
_one = one();
_ref = 2 * four + seven;
_undefined = undefined;
_computed = computed();
_computed2 = computed();
_ref2 = "test" + one;
_ref3 = /regex/;
_baz = baz;
_ref4 = `template${expression}`;

var MyClass = /*#__PURE__*/function (_computed3, _computed4, _ref5) {
  "use strict";

  function MyClass() {
    babelHelpers.classCallCheck(this, MyClass);
    babelHelpers.defineProperty(this, null, "null");
    babelHelpers.defineProperty(this, _undefined, "undefined");
    babelHelpers.defineProperty(this, void 0, "void 0");
    babelHelpers.defineProperty(this, _ref3, "regex");
    babelHelpers.defineProperty(this, foo, "foo");
    babelHelpers.defineProperty(this, bar, "bar");
    babelHelpers.defineProperty(this, _baz, "baz");
    babelHelpers.defineProperty(this, `template`, "template");
    babelHelpers.defineProperty(this, _ref4, "template-with-expression");
  }

  babelHelpers.createClass(MyClass, [{
    key: "whatever",
    get: function () {},
    set: function (value) {}
  }, {
    key: _computed3,
    get: function () {}
  }, {
    key: _computed4,
    set: function (value) {}
  }, {
    key: _ref5,
    value: function () {}
  }], [{
    key: "10",
    value: function _() {}
  }]);
  return MyClass;
}(_computed, _computed2, _ref2);

babelHelpers.defineProperty(MyClass, _one, "test");
babelHelpers.defineProperty(MyClass, 2 * 4 + 7, "247");
babelHelpers.defineProperty(MyClass, 2 * four + 7, "247");
babelHelpers.defineProperty(MyClass, _ref, "247");
