var _temp;

var _fooBrandCheck = /*#__PURE__*/new WeakSet();

class Foo {
  static #foo = (_temp = 1, _fooBrandCheck.add(this), _temp);

  test(other) {
    return _fooBrandCheck.has(other);
  }

}
