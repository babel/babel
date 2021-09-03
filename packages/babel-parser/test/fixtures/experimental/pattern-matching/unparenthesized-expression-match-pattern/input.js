match (token) {
  when ^foo {}
  when ^foo.bar.zoo {}
  when ^baz.bar() {}
  when ^baz?.bar() {}
  when ^baz["foo"].bar {}
  when (^LF | ^CR) {}
}
