let Foo = babelHelpers.decorate(class Foo {
  method() {}

  get bar() {}

  get baz() {}

  set baz(val) {}

}, [["bar"], ["baz"]], [["method", [decorated]]], void 0)([]);
let Bar = babelHelpers.decorate(class Bar {
  method() {}

  get 3() {}

  set 3(val) {}

}, [["3"]], [["method", [decorated]]], void 0)([]);
let Baz = babelHelpers.decorate(class Baz {
  method() {}

  get 3() {}

  set "3"(val) {}

}, [["3"]], [["method", [decorated]]], void 0)([]);
let Bam = babelHelpers.decorate(class Bam {
  method() {}

  get yo() {}

  set "yo"(val) {}

}, [["yo"]], [["method", [decorated]]], void 0)([]);
