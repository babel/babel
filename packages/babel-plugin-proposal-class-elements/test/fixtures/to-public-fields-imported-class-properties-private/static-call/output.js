var _foo = babelHelpers.temporalUndefined;

class Foo {
  test(x) {
    return babelHelpers.classCheckPrivateStaticAccess(Foo, Foo, _foo).call(Foo, x);
  }

}

_foo = function (x) {
  return x;
};
