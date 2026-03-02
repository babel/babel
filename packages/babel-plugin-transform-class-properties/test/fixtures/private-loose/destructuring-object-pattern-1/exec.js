class Foo {
  #client

  constructor(props) {
    this.#client = 'foo';
    ;({ x: this.x = this.#client, y: this.#client, z: this.z = this.#client } = props)
  }

  getClient() {
    return this.#client;
  }
}

const foo = new Foo({ y: 'bar' });
expect(foo.getClient()).toBe('bar');
expect(foo.x).toBe('foo');
expect(foo.z).toBe('bar');
