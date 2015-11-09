let _Foo = class Foo {};

var _FooCall = function () {
  foo();
};

var Foo = function (...args) {
  if (this instanceof Foo) {
    return Reflect.construct(_Foo, args);
  } else {
    return _FooCall.apply(this, args);
  }
};

Foo.__proto__ = _Foo;
Foo;
