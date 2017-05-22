class Foo {
  foo;
  foo = 1;
  "foo";
  "foo" = 1;
  foo = super.foo();
  ["foo"];
  ["foo"] = 1;
  ["f" + "oo"];
  ["f" + "oo"] = 1;

  static foo;
  static foo = 1;
  static "foo";
  static "foo" = 1;
  static foo = super.foo();
  static ["foo"];
  static ["foo"] = 1;
  static ["f" + "oo"];
  static ["f" + "oo"] = 1;
}
