function dec() {}

// Create a local function binding so babel has to change the name of the helper
function _defineProperty() {}

class A {
  @dec a;

  @dec b = 123;

  c = 456;
}
