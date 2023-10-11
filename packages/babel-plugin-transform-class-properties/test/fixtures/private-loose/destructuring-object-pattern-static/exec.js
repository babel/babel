class Foo {
  static #client

  constructor(props) {
    ;({ client: Foo.#client } = props)
  }

  getClient() {
    return Foo.#client;
  }
}

const foo = new Foo({ client: 'bar' });
expect(foo.getClient()).toBe('bar');
