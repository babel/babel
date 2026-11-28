let hits = 0;
struct B {
  constructor() {
    hits++;
  }
}
struct S extends B {
  constructor(S) {
    super();
    expect(S).toBe(5);
  }
}
struct T extends B {
  constructor() {
    let T = 1;
    super();
    expect(T).toBe(1);
  }
}
new S(5);
new T();
expect(hits).toBe(2);

// Shadowing bindings are not renamed
struct U extends B {
  constructor() {
    super();
    function U() {}
    this.name = U.name;
  }
  name;
}
expect(new U().name).toBe("U");

// The generated code does not shadow the struct name
struct P {
  v;
  constructor(v) {
    this.v = v;
  }
}
struct a extends P {
  constructor() {
    super(42);
  }
}
struct o extends P {
  x = 1;
  constructor(...args) {
    super(...args);
  }
}
expect(new a().v).toBe(42);
expect(new o(1).v).toBe(1);
