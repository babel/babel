foo(?);
foo(?, x);
foo(x, ?);
foo(?, x, ?);
obj.foo(x, ?);
obj.foo(?, x);
obj.foo(?, x, ?);

class foo {
  constructor() {
    baz(this, () => super.bar(?));
  }

}