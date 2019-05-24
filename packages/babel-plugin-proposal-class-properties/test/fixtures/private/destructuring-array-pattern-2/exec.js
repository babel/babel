class Foo {
  #client

  constructor(props) {
    ;([x, ...this.#client] = props);
  }

  getClient() {
    return this.#client;
  }
}

const foo = new Foo(['foo', 'bar', 'baz', 'quu']);
expect(foo.getClient()).toBe(['bar', 'baz', 'quu']);
