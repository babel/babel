const created = [];
const seen = [];
class C {
  #x;
  // Field initializers run before the parameters are evaluated, so this
  // exposes the instance even when the parameter destructuring throws.
  self = created.push(this);
  constructor(public foo, { #x: x}) {
    seen.push([this.foo, x]);
  }
  static setX(obj, value) {
    obj.#x = value;
  }
}

expect(() => new C("foo", {})).toThrow(TypeError);
expect(created.length).toBe(1);
expect("foo" in created[0]).toBe(false);
expect(seen).toEqual([]);

C.setX(created[0], "x");
const c = new C("foo", created[0]);
expect(c.foo).toBe("foo");
expect(seen).toEqual([["foo", "x"]]);
