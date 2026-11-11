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
    return [this.#a, this.#b(), this.#c, this.d];
  }
}
