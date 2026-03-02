function f(i) {
  if (i) f(i - 1);
  babelHelpers.tdz("x");
}
f(3);
var x;
