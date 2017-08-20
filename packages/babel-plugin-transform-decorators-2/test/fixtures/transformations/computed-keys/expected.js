let _foo, _ref;

let Bizz = babelHelpers.decorate(class Bizz {
  uncomputed() {}

  static [3 + 7]() {}

  [_foo = foo()]() {}

  [_ref = computed + and + undecorated]() {}

}, [[_ref]], [["uncomputed", [dec]], [3 + 7, [dec], true], [_foo, [dec]]], void 0)([]);
