import ImportedClass from "./ImportedClass";

var fn = () => "fn";

var MyClass1 =
/*#__PURE__*/
function () {
  function MyClass1() {
    babelHelpers.classCallCheck(this, MyClass1);
  }

  babelHelpers.createClass(MyClass1, [{
    key: "method",
    value: function method() {}
  }]);
  return MyClass1;
}();

var MyClass2 =
/*#__PURE__*/
function () {
  function MyClass2() {
    babelHelpers.classCallCheck(this, MyClass2);
  }

  babelHelpers.createClass(MyClass2, null, [{
    key: "method",
    value: function method() {}
  }]);
  return MyClass2;
}();

var MyClass3 =
/*#__PURE__*/
function (_GlobalClass) {
  babelHelpers.inherits(MyClass3, _GlobalClass);

  function MyClass3() {
    babelHelpers.classCallCheck(this, MyClass3);
    return babelHelpers.possibleConstructorReturn(this, (MyClass3.__proto__ || Object.getPrototypeOf(MyClass3)).apply(this, arguments));
  }

  babelHelpers.createClass(MyClass3, [{
    key: "method",
    value: function method() {}
  }]);
  return MyClass3;
}(GlobalClass);

var MyClass4 =
/*#__PURE__*/
function (_ImportedClass) {
  babelHelpers.inherits(MyClass4, _ImportedClass);

  function MyClass4() {
    babelHelpers.classCallCheck(this, MyClass4);
    return babelHelpers.possibleConstructorReturn(this, (MyClass4.__proto__ || Object.getPrototypeOf(MyClass4)).apply(this, arguments));
  }

  babelHelpers.createClass(MyClass4, [{
    key: "method",
    value: function method() {}
  }]);
  return MyClass4;
}(ImportedClass);

var MyClass5 =
/*#__PURE__*/
function (_fn) {
  babelHelpers.inherits(MyClass5, _fn);

  function MyClass5() {
    babelHelpers.classCallCheck(this, MyClass5);
    return babelHelpers.possibleConstructorReturn(this, (MyClass5.__proto__ || Object.getPrototypeOf(MyClass5)).apply(this, arguments));
  }

  babelHelpers.createClass(MyClass5, [{
    key: "method",
    value: function method() {}
  }]);
  return MyClass5;
}(fn());

var MyClass6 =
/*#__PURE__*/
function () {
  function MyClass6() {
    babelHelpers.classCallCheck(this, MyClass6);
  }

  babelHelpers.createClass(MyClass6, [{
    key: 2 + 2,
    value: function value() {}
  }]);
  return MyClass6;
}();

var MyClass7 =
/*#__PURE__*/
function () {
  function MyClass7() {
    babelHelpers.classCallCheck(this, MyClass7);
  }

  babelHelpers.createClass(MyClass7, [{
    key: fn(),
    value: function value() {}
  }]);
  return MyClass7;
}();

var MyClass8 =
/*#__PURE__*/
function () {
  function MyClass8() {
    babelHelpers.classCallCheck(this, MyClass8);
  }

  babelHelpers.createClass(MyClass8, null, [{
    key: fn(),
    value: function value() {}
  }]);
  return MyClass8;
}();
