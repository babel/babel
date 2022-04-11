class Container {
  #data = "hello!";

  get data(): typeof this.#data {
    return this.#data;
  }

  set data(value: typeof this.#data) {
    this.#data = value;
  }

}