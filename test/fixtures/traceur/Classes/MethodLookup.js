class MethodLookupA {
  foo() {
    return 'A.foo()';
  }
  get bar() {
    return 'A.get.bar';
  }
  set bar(value) { }
}

class MethodLookupB extends MethodLookupA {
  get foo() {
    return 'B.foo.get';
  }
  set foo(value) { }
  bar() {
    return 'B.bar()';
  }
}

class MethodLookupC extends MethodLookupB {
  x() {
    return super.foo;
  }
  y() {
    return super.bar();
  }
}

// ----------------------------------------------------------------------------

var c = new MethodLookupC();
assert.equal('B.foo.get', c.x());
assert.equal('B.bar()', c.y());
