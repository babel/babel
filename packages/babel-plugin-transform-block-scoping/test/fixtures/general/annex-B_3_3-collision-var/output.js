var run = function () {
  return false;
};
if (true) {
  var run = function () {
    return true;
  };
}
function test() {
  return run();
}
