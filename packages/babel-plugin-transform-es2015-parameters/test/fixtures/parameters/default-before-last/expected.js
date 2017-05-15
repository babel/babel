function foo(b, ..._ref) {
  let [a = "foo", b] = [b, ..._ref];
}