var _fooBrandCheck = /*#__PURE__*/new WeakSet();

class Foo {
  accessor #foo = void _fooBrandCheck.add(this);

  test(other) {
    return _fooBrandCheck.has(other);
  }

}
