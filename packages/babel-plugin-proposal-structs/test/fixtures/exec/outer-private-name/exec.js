class Outer {
  #init = 42;
  #fields = 43;
  m() {
    struct S {
      x = 1;
      constructor() {}
      foo(o) {
        return [o.#init, o.#fields];
      }
    }
    return new S().foo(this);
  }
}
expect(new Outer().m()).toEqual([42, 43]);
