var foo = "foo";

var bar = () => {};

var four = 4;

var _one = one();

var _ref = 2 * four + seven;

var _undefined = undefined;

var _computed = computed();

var _computed2 = computed();

var _ref2 = "test" + one;

var _ref3 = /regex/;
var _bar = bar;
var _baz = baz;
var _ref4 = `template${expression}`;

var MyClass =
/*#__PURE__*/
function () {
  "use strict";

  function MyClass() {
    babelHelpers.classCallCheck(this, MyClass);
    babelHelpers.defineProperty(babelHelpers.defineProperty(babelHelpers.defineProperty(babelHelpers.defineProperty(babelHelpers.defineProperty(babelHelpers.defineProperty(babelHelpers.defineProperty(babelHelpers.defineProperty(babelHelpers.defineProperty(this, null, "null"), _undefined, "undefined"), void 0, "void 0"), _ref3, "regex"), foo, "foo"), _bar, "bar"), _baz, "baz"), `template`, "template"), _ref4, "template-with-expression");
  }

  babelHelpers.createClass(MyClass, [{
    key: _ref2,
    value: function () {}
  }, {
    key: "whatever",
    get: function () {},
    set: function (value) {}
  }, {
    key: _computed,
    get: function () {}
  }, {
    key: _computed2,
    set: function (value) {}
  }], [{
    key: 10,
    value: function () {}
  }]);
  return MyClass;
}();

babelHelpers.defineProperty(babelHelpers.defineProperty(babelHelpers.defineProperty(babelHelpers.defineProperty(MyClass, _one, "test"), 2 * 4 + 7, "247"), 2 * four + 7, "247"), _ref, "247");
