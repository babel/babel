function dec(Class, key, desc) {
  return desc;
}

class Foo {
  @dec
  get bar() {}
}
