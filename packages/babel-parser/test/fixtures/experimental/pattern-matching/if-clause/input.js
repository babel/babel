match (x) {
  if(isFoo(x)) { "foo" }
  if(isBar(x)) "bar"
  when({ foo: 100 }) {}
  else "foo"
}
