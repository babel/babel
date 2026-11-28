struct Base {
  #a = 1;
  #m() {
    return this.#a;
  }
  static has(o) {
    return #a in o && #m in o;
  }
  getA() {
    return this.#m();
  }
}
struct Derived extends Base {
  #a = 2;
  getOwnA() {
    return this.#a;
  }
  setOwnA(v) {
    this.#a = v;
  }
}
const d = new Derived();
expect(Base.has(d)).toBe(true);
expect(Base.has({})).toBe(false);
expect(d.getA()).toBe(1);
expect(d.getOwnA()).toBe(2);
d.setOwnA(3);
expect(d.getOwnA()).toBe(3);
expect(Reflect.ownKeys(d)).toEqual([]);
