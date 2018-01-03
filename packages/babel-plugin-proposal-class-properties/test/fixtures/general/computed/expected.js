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
  function MyClass() {
    babelHelpers.classCallCheck(this, MyClass);
    Object.defineProperty(this, null, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "null"
    });
    Object.defineProperty(this, _undefined, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "undefined"
    });
    Object.defineProperty(this, void 0, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "void 0"
    });
    Object.defineProperty(this, _ref3, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "regex"
    });
    Object.defineProperty(this, foo, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "foo"
    });
    Object.defineProperty(this, _bar, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "bar"
    });
    Object.defineProperty(this, _baz, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "baz"
    });
    Object.defineProperty(this, `template`, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "template"
    });
    Object.defineProperty(this, _ref4, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "template-with-expression"
    });
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

Object.defineProperty(MyClass, _one, {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "test"
});
Object.defineProperty(MyClass, 2 * 4 + 7, {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "247"
});
Object.defineProperty(MyClass, 2 * four + 7, {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "247"
});
Object.defineProperty(MyClass, _ref, {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "247"
});
