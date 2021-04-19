var _FooBrandCheck = new WeakSet();

class Foo {
  #foo = (_FooBrandCheck.add(this), 1);

  test(other) {
    return _FooBrandCheck.has(other);
  }

}
