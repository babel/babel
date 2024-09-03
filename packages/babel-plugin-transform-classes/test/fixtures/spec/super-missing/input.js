class Base {};

expect(() => new class extends Base {
  constructor() {
    x: { break x; super(); }
  }
}).toThrow();

expect(() => new class extends Base {
  constructor() {
    try {} catch { super(); }
  }
}).toThrow();

expect(() => new class extends Base {
  constructor() {
    try { throw 0; super(); } catch {}
  }
}).toThrow();

expect(() => new class extends Base {
  constructor() {
    true || super();
  }
}).toThrow();

expect(() => new class extends Base {
  constructor() {
    ({}) ?? super();
  }
}).toThrow();

expect(() => new class extends Base {
  constructor() {
    false && super();
  }
}).toThrow();

expect(() => new class extends Base {
  constructor() {
    null?.(super());
  }
}).toThrow();


expect(() => new class extends Base {
  constructor() {
    null?.[super()];
  }
}).toThrow();
