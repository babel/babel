var _ABrandCheck = new WeakSet();

class A {
  #foo = void _ABrandCheck.add(this);
  static #_ = (() => {
    register(A, _ABrandCheck.has(A));
  })();
}
