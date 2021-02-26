class Foo {
  static #client

  constructor(props) {
    ;([Foo.#client] = props);
  }

  getClient() {
    return Foo.#client;
  }
}

const foo = new Foo(['bar']);
expect(foo.getClient()).toBe('bar');
