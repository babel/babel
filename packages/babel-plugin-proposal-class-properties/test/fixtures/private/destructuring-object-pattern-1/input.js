class Foo {
  #client

  constructor(props) {
    this.#client = 'foo';
    ({ x: this.x = this.#client, y: this.#client, z: this.z = this.#client } = props)
  }
}