class Foo extends Bar {
  bar = "foo";

  constructor(x = () => { check(super()) }) {
  }
}
