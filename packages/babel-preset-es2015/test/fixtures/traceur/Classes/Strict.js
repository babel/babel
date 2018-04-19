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

expect(new C1().m()).toBeUndefined();
expect(new C2().m()).toBeUndefined();
expect(new C3().m()).toBeUndefined();
expect(new C4().m()).toBeUndefined();
