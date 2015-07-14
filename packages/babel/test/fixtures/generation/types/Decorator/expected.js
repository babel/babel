var obj = {
  @foo
  @bar
  foo: "bar",

  @foo
  @bar
  foo() {},

  @foo
  get foo() {},

  @bar
  set bar(foo) {}
};

class Foo {
  @foo
  @bar
  foo() {}

  @foo
  @bar
  foo() {}

  @foo
  get foo() {}

  @bar
  set bar(foo) {}
}
