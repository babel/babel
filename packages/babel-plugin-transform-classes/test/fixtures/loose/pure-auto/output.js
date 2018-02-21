import ImportedClass from "./ImportedClass";

var fn = () => "fn";

var MyClass1 =
/*#__PURE__*/
function () {
  function MyClass1() {}

  var _proto = MyClass1.prototype;

  _proto.method = function method() {};

  return MyClass1;
}();

var MyClass2 =
/*#__PURE__*/
function () {
  function MyClass2() {}

  MyClass2.method = function method() {};

  return MyClass2;
}();

var MyClass3 =
/*#__PURE__*/
function (_GlobalClass) {
  babelHelpers.inheritsLoose(MyClass3, _GlobalClass);

  function MyClass3() {
    return _GlobalClass.apply(this, arguments) || this;
  }

  var _proto2 = MyClass3.prototype;

  _proto2.method = function method() {};

  return MyClass3;
}(GlobalClass);

var MyClass4 =
/*#__PURE__*/
function (_ImportedClass) {
  babelHelpers.inheritsLoose(MyClass4, _ImportedClass);

  function MyClass4() {
    return _ImportedClass.apply(this, arguments) || this;
  }

  var _proto3 = MyClass4.prototype;

  _proto3.method = function method() {};

  return MyClass4;
}(ImportedClass);

var MyClass5 =
/*#__PURE__*/
function (_fn) {
  babelHelpers.inheritsLoose(MyClass5, _fn);

  function MyClass5() {
    return _fn.apply(this, arguments) || this;
  }

  var _proto4 = MyClass5.prototype;

  _proto4.method = function method() {};

  return MyClass5;
}(fn());

var MyClass6 =
/*#__PURE__*/
function () {
  function MyClass6() {}

  var _proto5 = MyClass6.prototype;

  _proto5[2 + 2] = function () {};

  return MyClass6;
}();

var MyClass7 =
/*#__PURE__*/
function () {
  function MyClass7() {}

  var _proto6 = MyClass7.prototype;

  _proto6[fn()] = function () {};

  return MyClass7;
}();

var MyClass8 =
/*#__PURE__*/
function () {
  function MyClass8() {}

  MyClass8[fn()] = function () {};

  return MyClass8;
}();
