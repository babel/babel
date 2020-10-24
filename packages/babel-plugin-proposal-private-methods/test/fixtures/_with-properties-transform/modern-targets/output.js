var _method;

var _method2 = new WeakMap();

// The output here is not ideal: first we compile the private
// method to a private field, and then we compile that private
// field.
// This generates bigger code, but the fix is easy: if your
// targets support private fields, than you can simply avoid
// compiling them!
class A {
  constructor() {
    _method2.set(this, {
      writable: true,
      value: _method || (_method = function () {})
    });
  }

}
