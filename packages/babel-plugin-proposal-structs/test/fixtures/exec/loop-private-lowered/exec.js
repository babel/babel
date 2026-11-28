struct A {
  constructor() {
    return "A";
  }
}
struct B {
  constructor() {
    return "B";
  }
}

const structs = [];
const instances = [];
for (const Base of [A, B]) {
  struct D extends Base {
    v;
    constructor() {
      this.v = super();
    }
    #m() {
      return this.v;
    }
    getM() {
      return this.#m;
    }
  }
  structs.push(D);
  instances.push(new D());
}

expect(structs.map(D => new D().v)).toEqual(["A", "B"]);
expect(instances.map(d => d.getM().call(d))).toEqual(["A", "B"]);
expect(() => instances[0].getM().call(instances[1])).toThrow(TypeError);
