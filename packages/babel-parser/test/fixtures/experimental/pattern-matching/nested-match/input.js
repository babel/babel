match (
  match (foo) {
    when (x) {
      "foo"
    }
  }
) {
  when ({ x }) { "bar" }
}
