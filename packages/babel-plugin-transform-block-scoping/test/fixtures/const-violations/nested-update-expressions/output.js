var c = 17;
var a = 0;
function f() {
  return (+c, babelHelpers.readOnlyError("c")) + --a;
}
