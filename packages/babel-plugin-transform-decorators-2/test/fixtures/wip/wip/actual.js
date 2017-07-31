let decorate = () => void 0, dec, bar, foo = {bar: () => void 0}, baz, decorator; //just to supress ReferenceErrors

@decorator class Bizz {
  @dec m1() {};
  @bar @foo.bar(baz) m2() {};
  @dec static [3 + 7] () {};
  andAnUndecoratedMethod () {};
  [calculated + and + undecorated] () {};
}
