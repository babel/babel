// Options: --symbols
var sym = Symbol();
class C {
  static [sym]() {
    return 42;
  }
}
assert.equal(C[sym](), 42);
