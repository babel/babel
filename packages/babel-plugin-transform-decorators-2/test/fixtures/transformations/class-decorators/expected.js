let Foo = babelHelpers.decorate(class Foo {
  someMethod() {}

}, [["someMethod"]], [], void 0)([classDecOuter("args"), classDecInner]);
let Undecorated = class Undecorated {
  someMethod() {}

};