function f(...args) {
  function args() {}
  return typeof args;
}
function* g(...args) {
  function args() {}
  yield typeof args;
}
