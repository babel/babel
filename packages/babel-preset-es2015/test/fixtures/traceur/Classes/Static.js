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

expect(B.m()).toBe(B);
expect(B.x).toBe(42);
B.x = 1;
expect(x).toBe(1);

class StaticMethod {
  static static() {
    return 'static method';
  }
}

expect(StaticMethod.static()).toBe('static method');

class StaticGetter {
  static get static() {
    return 'static getter';
  }
}

expect(StaticGetter.static).toBe('static getter');

class StaticSetter {
  static set static(value) {
    x = value;
  }
}

StaticSetter.static = 'static setter';
expect(x).toBe('static setter');

class MethodNamedStatic {
  static() {
    return this;
  }
}

var c = new MethodNamedStatic();
expect(c.static()).toBe(c);

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
expect(c.static).toEqual([c, 2]);
c.static = 3;
expect(x).toEqual([c, 3]);
