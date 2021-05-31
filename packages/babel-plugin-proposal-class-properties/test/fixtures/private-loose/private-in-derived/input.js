class Outer {
  #outer;

  constructor() {
    class Test extends this.#outer {
    }
  }
}
