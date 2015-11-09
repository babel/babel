let _Foo = class Foo {};

var _FooCall = function () {};

var Foo = function (...args) {
  if (this instanceof Foo) {
    return Reflect.construct(_Foo, args);
  } else {
    return _FooCall.apply(this, args);
  }
};

Foo.__proto__ = _Foo;
export default Foo;
