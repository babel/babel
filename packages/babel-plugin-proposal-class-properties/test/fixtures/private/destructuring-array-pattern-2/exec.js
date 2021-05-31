class Foo {
  #client

  constructor(props) {
    let x;
    ;([x, ...this.#client] = props);
  }

  getClient() {
    return this.#client;
  }
}

const foo = new Foo(['foo', 'bar', 'baz', 'quu']);
expect(foo.getClient()).toEqual(['bar', 'baz', 'quu']);
