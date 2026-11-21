struct Base {
  value;
  constructor(value) {
    this.value = value;
    return "ignored by new";
  }
}

struct Derived extends Base {
  results = [];
  constructor(a, b) {
    this.results.push(super(a));
    const f = () => super(b);
    this.results.push(f());
  }
}

const d = new Derived(1, 2);
expect(d).toBeInstanceOf(Derived);
expect(d.value).toBe(2);
expect(d.results).toEqual(["ignored by new", "ignored by new"]);

struct NoInitializer extends Derived {}
expect(new NoInitializer(1, 2).results).toEqual([]);

struct CallsEmpty extends Base {}
struct Grandchild extends CallsEmpty {
  constructor() {
    this.result = super();
  }
  result;
}
expect(new Grandchild().result).toBeUndefined();

// Nested super() calls
struct Returns {
  constructor(v) {
    return v * 2;
  }
}
struct Nested extends Returns {
  result;
  constructor() {
    this.result = super(super(5));
  }
}
expect(new Nested().result).toBe(20);

// super() calls the parent struct of the definition, which is the
// [[Prototype]] of the initializer
const log = [];
struct A1 {
  constructor() {
    log.push("A1");
  }
}
struct C1 {
  constructor() {
    log.push("C1");
  }
}
struct B1 extends A1 {
  constructor() {
    super();
  }
}
Object.setPrototypeOf(B1, C1);
new B1();
expect(log).toEqual(["A1"]);

// The parent is read before evaluating the arguments
const log2 = [];
struct P1 {
  constructor() {
    log2.push("P1");
  }
}
struct P2 {}
struct C2 extends P1 {
  constructor() {
    super(Object.setPrototypeOf(C2, P2));
  }
}
new C2();
expect(log2).toEqual(["P1"]);
