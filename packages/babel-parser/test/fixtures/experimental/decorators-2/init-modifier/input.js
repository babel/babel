@init:foo
class A {
  @init:foo bar;

  @init:foo baz = 123;

  @init:foo get qux() {}

  @init:foo quux() {}

  @init:(foo) foobar;

  @init:foo.bar barbaz;
}
