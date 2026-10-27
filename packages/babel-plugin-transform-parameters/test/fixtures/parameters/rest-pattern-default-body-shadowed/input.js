var x = "outer";
function f(...[a = () => x]) {
  var x = "inner";
  return a();
}
function g(...[a = () => h]) {
  function h() {}
  return a();
}
function k(...[a = () => x]) {
  let x = "inner";
  return a();
}
