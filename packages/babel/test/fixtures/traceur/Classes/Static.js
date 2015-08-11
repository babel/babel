var x = 42;

class B {
  static m() {
    return this;
  }

  static get x() {
    return x;
  }

  static set x(value) {
     x = value;
  }
}

assert.equal(B, B.m());
assert.equal(42, B.x);
B.x = 1;
assert.equal(1, x);

class StaticMethod {
  static static() {
    return 'static method';
  }
}

assert.equal('static method', StaticMethod.static());

class StaticGetter {
  static get static() {
    return 'static getter';
  }
}

assert.equal('static getter', StaticGetter.static);

class StaticSetter {
  static set static(value) {
    x = value;
  }
}

StaticSetter.static = 'static setter';
assert.equal('static setter', x);

class MethodNamedStatic {
  static() {
    return this;
  }
}

var c = new MethodNamedStatic();
assert.equal(c, c.static());

class AccessorNamedStatic {
  get static() {
    return [this, x];
  }

  set static(value) {
    x = [this, value];
  }
}

x = 2;
c = new AccessorNamedStatic();
assertArrayEquals([c, 2], c.static);
c.static = 3;
assertArrayEquals([c, 3], x);
