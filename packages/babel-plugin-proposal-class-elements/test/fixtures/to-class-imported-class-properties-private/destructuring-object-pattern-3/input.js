class Foo {
  #client

  constructor(props) {
    ({x: this.#client = 5} = props);
  }
}