var bar;
var x = function () {
  bar = "foo";
  if (!bar) throw new Error("unreachable");
  return bar;
}();
