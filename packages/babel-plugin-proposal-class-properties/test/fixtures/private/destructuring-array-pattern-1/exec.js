class Foo {
  #client

  constructor(props) {
    this.#client = 1;
    ;([this.x = this.#client, this.#client, this.y = this.#client] = props);
  }

  getClient() {
    return this.#client;
  }
}

const foo = new Foo([undefined, 'bar']);
expect(foo.getClient()).toBe('bar');
expect(foo.x).toBe(1);
expect(foo.y).toBe('bar');
