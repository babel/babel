class Foo {
  static #client

  constructor(props) {
    ({ client: Foo.#client } = props)
  }
}
