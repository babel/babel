var _fooBrandCheck = /*#__PURE__*/new WeakSet();

class Foo {
  static accessor #foo = void _fooBrandCheck.add(this);

  test(other) {
    return _fooBrandCheck.has(other);
  }

}
