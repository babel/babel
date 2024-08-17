const dec = () => {}; 
class A {
  #A = 1;
  static B = class B extends A {
    accessor a = 2;

    getA() {
      return this.#A;
    }
  }
}
