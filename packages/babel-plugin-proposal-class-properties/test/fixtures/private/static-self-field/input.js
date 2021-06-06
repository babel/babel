function wrapper(wc) {
  return wc
}

const f = wrapper(class Foo {
  static #x = Foo;
  static y = Foo;
});
