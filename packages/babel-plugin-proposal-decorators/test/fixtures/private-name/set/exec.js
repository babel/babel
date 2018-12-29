var pn;
class A {
  @(({ key }) => { pn = key; })
  #x = 1;

  getX() {
    return this.#x;
  }
}

var a = new A();
expect(a.getX()).toBe(1);
pn.set(a, 2);
expect(a.getX()).toBe(2);
