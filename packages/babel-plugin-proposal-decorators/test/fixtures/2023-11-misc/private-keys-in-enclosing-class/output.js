const dec = () => {};
class A {
  #A = 1;
  static B = class B extends A {
    #B = 2;
    get a() {
      return this.#B;
    }
    set a(v) {
      this.#B = v;
    }
    getA() {
      return this.#A;
    }
  };
}
