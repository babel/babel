class Foo {
  #a = new.target;
  #b = () => new.target;
  #c = function () {
    return new.target;
  };

  constructor() {
    this.d = new.target;
  }

  test() {
    const c = this.#c;
    return [this.#a, this.#b(), c(), new c() === c, this.d];
  }
}

class Sub extends Foo {}

expect(new Foo().test()).toEqual([undefined, undefined, undefined, true, Foo]);
expect(new Sub().test()).toEqual([undefined, undefined, undefined, true, Sub]);
