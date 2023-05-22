class Foo {
  #client

  constructor(props) {
    ({ x, ...this.#client } = props)
  }
}