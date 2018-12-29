var pn;
class A {
  @(({ key }) => { pn = key; })
  #x = 1;

  setX(v) {
    this.#x = v;
  }
}

var a = new A();
expect(pn.get(a)).toBe(1);
a.setX(2);
expect(pn.get(a)).toBe(2);
