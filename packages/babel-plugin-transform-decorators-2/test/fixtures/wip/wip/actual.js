@decorator class Bizz {
  @dec m1() {};
  @bar @foo.bar(baz) m2() {};
  @dec static [3 + 7] () {};
  andAnUndecoratedMethod () {};
  [calculated + and + undecorated] () {};
  @dec [foo()] () {}
}
