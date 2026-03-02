var _temp, _temp3;

var _fooBrandCheck = /*#__PURE__*/new WeakSet();

var _barBrandCheck2 = /*#__PURE__*/new WeakSet();

class Foo {
  #foo = (_temp = 1, _fooBrandCheck.add(this), _temp);
  #bar = (_temp3 = 1, _barBrandCheck2.add(this), _temp3);

  test() {
    var _temp2;

    var _barBrandCheck = /*#__PURE__*/new WeakSet();

    class Nested {
      #bar = (_temp2 = 2, _barBrandCheck.add(this), _temp2);

      test() {
        _fooBrandCheck.has(this);

        _barBrandCheck.has(this);
      }

    }

    _fooBrandCheck.has(this);

    _barBrandCheck2.has(this);
  }

}
