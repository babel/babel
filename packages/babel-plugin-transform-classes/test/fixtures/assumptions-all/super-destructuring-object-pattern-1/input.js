class Foo {
  foo(props) {
    ;({ x, ...super.client } = props)
  }
}