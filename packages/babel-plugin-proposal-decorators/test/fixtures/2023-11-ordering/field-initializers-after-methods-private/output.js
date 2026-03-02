let _fooDecs, _init_foo, _init_extra_foo;
var counter = 0;
class A {
  static {
    [_init_foo, _init_extra_foo] = babelHelpers.applyDecs2311(this, [], [[_fooDecs, 0, "foo", o => o.#foo, (o, v) => o.#foo = v]], 0, _ => #bar in _).e;
  }
  #foo = _init_foo(this, (() => {
    counter++;
    expect(typeof this.method).toBe("function");
    expect(() => this.#foo).toThrow();
    expect(() => this.#bar).toThrow();
    return "#foo";
  })());
  [(_fooDecs = (_, {
    addInitializer
  }) => {
    addInitializer(function () {
      counter++;
      expect(typeof this.method).toBe("function");
      expect(this.#foo).toBe("#foo");
      expect(() => this.#bar).toThrow();
    });
  }, "method")]() {}
  #bar = (_init_extra_foo(this), (() => {
    counter++;
    expect(typeof this.method).toBe("function");
    expect(this.#foo).toBe("#foo");
    expect(() => this.#bar).toThrow();
  })());
}
expect(counter).toBe(0);
new A();
expect(counter).toBe(3);
