class Foo {
  @decorated method() {}
  get bar() {}
  get baz() {}
  set baz(val) {}
}

class Bar {
  @decorated method() {}
  get 3() {}
  set 3(val) {}
}

class Baz {
  @decorated method() {}
  get 3() {}
  set "3"(val) {}
}

class Bam {
  @decorated method() {}
  get yo() {}
  set "yo"(val) {}
}
