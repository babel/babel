class C {
  constructor() {
  }
}

class D extends C {
  constructor() {
    super();
    this.x = {
      y: () => {
        return this;
      }
    };
  }
}

var o = new D();
assert.equal(typeof o.x.y, 'function');
assert.equal(o.x.y(), o);
