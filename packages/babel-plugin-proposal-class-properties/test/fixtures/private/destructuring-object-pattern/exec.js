class Foo {
  #client

  constructor(props) {
    ;({ client: this.#client } = props)
  }

  getClient() {
    return this.#client;
  }
}

const foo = new Foo({ client: 'bar' });
expect(foo.getClient()).toBe('bar');
