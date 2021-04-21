var _fooBrandCheck = new WeakSet();

class A {
  static #foo = void _fooBrandCheck.add(this);

  test() {
    let A = function fn(A) {
      return _fooBrandCheck.has(A);
    };
  }

}
