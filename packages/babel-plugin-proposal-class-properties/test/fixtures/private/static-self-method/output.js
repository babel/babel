var _class;

function wrapper(wc) {
  return wc;
}

wrapper(_class = class Foo {});

function _bar() {
  return _class;
}

function _method() {
  return function inner() {
    return _class;
  };
}

function _method_shadowed() {
  new _class();
  return function inner() {
    var Foo = 3;
    return Foo;
  };
}
