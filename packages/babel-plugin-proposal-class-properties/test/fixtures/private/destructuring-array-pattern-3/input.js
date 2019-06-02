class Foo {
  #client

  constructor(props) {
    ([this.#client = 5] = props);
  }
}