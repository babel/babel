var _FooBrandCheck = new WeakSet();

class Foo {
  #foo = (_FooBrandCheck.add(this), 1);
  #bar = 1;

  test() {
    var _NestedBrandCheck = new WeakSet();

    class Nested {
      #bar = (_NestedBrandCheck.add(this), 2);

      test() {
        _FooBrandCheck.has(this);

        _NestedBrandCheck.has(this);
      }

    }

    _FooBrandCheck.has(this);

    _FooBrandCheck.has(this);
  }

}
