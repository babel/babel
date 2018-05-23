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
expect(typeof o.x.y).toBe('function');
expect(o.x.y()).toBe(o);
