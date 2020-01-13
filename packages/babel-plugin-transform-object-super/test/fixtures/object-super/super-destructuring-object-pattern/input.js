const foo = {
  bar(props) {
    ;({ client: super.client } = props)
  }
}