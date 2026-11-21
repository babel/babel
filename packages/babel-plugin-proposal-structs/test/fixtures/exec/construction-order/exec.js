const log = [];

struct Base {
  a = (log.push(["Base.a", Object.isSealed(this), Object.keys(this)]), 1);
  constructor(...args) {
    log.push(["Base.constructor", args]);
  }
}

struct Derived extends Base {
  b = (log.push(["Derived.b", this.a]), 2);
  constructor(x, y) {
    log.push(["Derived.constructor", this.a, this.b]);
    super(x + y, "extra");
    log.push(["Derived.after super"]);
  }
}

const d = new Derived(1, 2);
expect(log).toEqual([
  ["Base.a", true, ["a", "b"]],
  ["Derived.b", 1],
  ["Derived.constructor", 1, 2],
  ["Base.constructor", [3, "extra"]],
  ["Derived.after super"],
]);

// The parent constructor is not run unless super() is called
log.length = 0;
struct NoSuper extends Base {
  constructor() {}
}
new NoSuper();
expect(log).toEqual([["Base.a", true, ["a"]]]);
