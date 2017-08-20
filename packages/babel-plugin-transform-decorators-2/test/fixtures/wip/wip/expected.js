let Bizz = babelHelpers.decorate(class Bizz {
  m1() {}

  m2() {}

  static [3 + 7]() {}

  andAnUndecoratedMethod() {}

  [_ref = calculated + and + undecorated]() {}

  [_foo = foo()]() {}

}, [["andAnUndecoratedMethod"], [_ref]], [["m1", [dec]], ["m2", [bar, foo.bar(baz)]], [3 + 7, [dec], true], [_foo, [dec]]], void 0)([decorator]);
