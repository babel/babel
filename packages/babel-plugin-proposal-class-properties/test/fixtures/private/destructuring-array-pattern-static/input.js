class Foo {
  static #client

  constructor(props) {
    ([Foo.#client] = props);
  }
}
