struct Base {
  #p = 1;
  getP() {
    return this.#p;
  }
}
struct Derived extends Base {
  #q = 2;
  getQ() {
    return this.#q;
  }
}
Object.freeze(Base);
Object.freeze(Derived);
const d = new Derived();
expect(d.getP()).toBe(1);
expect(d.getQ()).toBe(2);
