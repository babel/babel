var Foo = function () {
  function Foo() {}

  var _proto = Foo.prototype;

  _proto["bar"] = function bar() {};

  return Foo;
}();