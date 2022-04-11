class Foo {
  #client

  constructor(props) {
    let x;
    ;({ x, ...this.#client } = props)
  }

  getClient() {
    return this.#client;
  }
}

const foo = new Foo({ x: 'foo', y: 'bar', z: 'baz' });
expect(foo.getClient()).toEqual({ y: 'bar', z: 'baz' });
