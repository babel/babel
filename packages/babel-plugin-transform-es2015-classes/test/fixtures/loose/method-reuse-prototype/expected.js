var Test = function () {
  function Test() {}

  var _proto = Test.prototype;

  _proto.a = function a() {};

  Test.b = function b() {};

  _proto.c = function c() {};

  return Test;
}();