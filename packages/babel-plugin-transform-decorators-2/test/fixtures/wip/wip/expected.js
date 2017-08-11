let decorate = () => void 0,
    dec,
    bar,
    foo = {
  bar: () => void 0
},
    baz,
    decorator; //just to supress ReferenceErrors


let _key;

let Bizz = babelHelpers.decorate(class Bizz {
  m1() {}

  m2() {}

  static [(_key = 3 + 7)]() {}

  andAnUndecoratedMethod() {}

  [calculated + and + undecorated]() {}

}, [["andAnUndecoratedMethod"], [calculated + and + undecorated]], [["m1", [dec]], ["m2", [bar, foo.bar(baz)]], [(_key = 3 + 7), [dec], true]], void 0)([decorator]);