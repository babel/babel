var a = {
  foo() {
    return 'A';
  }
};

var b = {
  __proto__: a,
  foo() {
    return super.foo() + ' B';
  }
};

var c = {
  __proto__: b,
  foo() {
    return super.foo() + ' C';
  }
};

var d = {
  __proto__: c,
  foo() {
    return super.foo() + ' D';
  }
};

// ----------------------------------------------------------------------------

expect(d.foo()).toBe('A B C D');
