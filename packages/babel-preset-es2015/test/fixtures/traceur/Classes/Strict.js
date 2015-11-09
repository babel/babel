class C1 {
  m() {
    return function() {
      return this;
    }();
  }
}

class C2 extends C1 {
  m() {
    return function() {
      return this;
    }();
  }
}

var C3 = class {
  m() {
    return function() {
      return this;
    }();
  }
};

var C4 = class extends C3 {
  m() {
    return function() {
      return this;
    }();
  }
};

assert.isUndefined(new C1().m());
assert.isUndefined(new C2().m());
assert.isUndefined(new C3().m());
assert.isUndefined(new C4().m());
