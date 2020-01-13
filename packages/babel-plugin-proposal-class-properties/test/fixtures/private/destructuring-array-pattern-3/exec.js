class Foo {
  #client

  constructor(props) {
    ([this.#client = 5] = props);
  }

  getClient() {
    return this.#client;
  }
}

const foo = new Foo([]);
expect(foo.getClient()).toEqual(5);
