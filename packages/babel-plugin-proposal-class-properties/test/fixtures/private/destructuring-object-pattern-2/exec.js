class Foo {
  #client

  constructor(props) {
    ;({ x, ...this.#client } = props)
  }

  getClient() {
    return this.#client;
  }
}

const foo = new Foo({ x: 'foo', y: 'bar', z: 'baz' });
expect(foo.getClient()).toBe({ y: 'bar', z: 'baz' });
