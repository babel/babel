class Foo {
  ['HELLO']() {
    console.log('>>>>', Foo);
  }
}
babelHelpers.defineProperty(Foo, "nickname", 'Tom');
