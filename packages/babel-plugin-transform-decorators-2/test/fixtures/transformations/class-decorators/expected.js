let Foo = babelHelpers.decorate(class Foo {
  someMethod() {}

}, [["someMethod"]], [], void 0)([classDecOuter("args"), classDecInner]);

class Undecorated {
  someMethod() {}

}
