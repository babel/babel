var _FooBrandCheck = new WeakSet();

class Foo {
  #foo = (_FooBrandCheck.add(this), 1);

  test() {
    var _NestedBrandCheck = new WeakSet();

    class Nested {
      #foo = (_NestedBrandCheck.add(this), 2);

      test() {
        _NestedBrandCheck.has(this);
      }

    }

    _FooBrandCheck.has(this);
  }

}
