var c = 17;
var a = 0;

function f() {
  return (babelHelpers.readOnlyError("c"), ++c) + --a;
}
