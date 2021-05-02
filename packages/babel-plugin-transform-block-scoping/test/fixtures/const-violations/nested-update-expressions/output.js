var c = 17;
var a = 0;

function f() {
  return (c + 1, babelHelpers.readOnlyError("c")) + --a;
}
