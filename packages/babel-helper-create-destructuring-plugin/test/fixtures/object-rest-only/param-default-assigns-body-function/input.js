var y = "outer";
function f(...{ v = (y = 5), ...h }) {
  return y;
  function y() {}
}
