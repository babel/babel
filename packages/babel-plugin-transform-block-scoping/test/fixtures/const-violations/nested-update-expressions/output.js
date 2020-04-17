function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var c = 17;
var a = 0;

function f() {
  return (_readOnlyError("c"), ++c) + --a;
}
