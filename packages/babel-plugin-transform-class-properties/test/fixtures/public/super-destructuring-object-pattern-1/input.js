class Foo {
  constructor(props) {
    ;({ x, ...super.client } = props)
  }
}