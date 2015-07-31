export class HelloComponent {
  constructor(@Yes({ key: "value" }) @No() foo: Foo, @Maybe() bar: Bar, baz: Baz) {
  }
}