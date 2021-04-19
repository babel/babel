var _FooBrandCheck = new WeakSet();

class Foo {
  #foo = (_FooBrandCheck.add(this), 1);

  test() {
    class Nested {
      test() {
        _FooBrandCheck.has(this);
      }

    }

    _FooBrandCheck.has(this);
  }

}
