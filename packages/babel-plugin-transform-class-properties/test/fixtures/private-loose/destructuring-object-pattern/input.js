class Foo {
  #client

  constructor(props) {
    ({ client: this.#client } = props)
  }
}