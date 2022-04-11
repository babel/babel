class Foo {
  #client

  constructor(props) {
    ({ client: this.#client = 5 } = props);
  }
}