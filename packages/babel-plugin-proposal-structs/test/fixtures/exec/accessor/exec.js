const log = [];
struct Base {
  accessor a = 1;
  accessor #b = 2;
  getB() {
    return this.#b;
  }
}
struct Derived extends Base {
  set a(v) {
    log.push(v);
  }
}
const d = new Derived();
// The field initializer of Base does not call the setter of Derived
expect(log).toEqual([]);
expect(d.getB()).toBe(2);
expect(Object.keys(d)).toEqual([]);

const b = new Base();
expect(b.a).toBe(1);
b.a = 3;
expect(b.a).toBe(3);

// Auto-accessors replace the methods with the same key
struct Replaced {
  m() {}
  accessor m = 1;
}
expect(new Replaced().m).toBe(1);

const k = "m";
const j = "j";
struct ReplacedComputed {
  m() {}
  accessor [k] = 1;
  n() {}
  [j]() {}
  accessor n = 2;
  o() {}
}
const replaced = new ReplacedComputed();
expect(replaced.m).toBe(1);
expect(replaced.n).toBe(2);
expect(() => ReplacedComputed.prototype.j.call({})).toThrow(TypeError);
expect(() => ReplacedComputed.prototype.o.call({})).toThrow(TypeError);
