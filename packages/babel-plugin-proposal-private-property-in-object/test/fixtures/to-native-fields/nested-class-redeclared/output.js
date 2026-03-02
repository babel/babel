var _temp2;

var _fooBrandCheck2 = /*#__PURE__*/new WeakSet();

class Foo {
  #foo = (_temp2 = 1, _fooBrandCheck2.add(this), _temp2);

  test() {
    var _temp;

    var _fooBrandCheck = /*#__PURE__*/new WeakSet();

    class Nested {
      #foo = (_temp = 2, _fooBrandCheck.add(this), _temp);

      test() {
        _fooBrandCheck.has(this);
      }

    }

    _fooBrandCheck2.has(this);
  }

}
