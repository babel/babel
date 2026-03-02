var _arguments = [1, 2, 3];
var arr = function (n) {
  return _arguments[0];
};
arr(4); // 1

function foo(n) {
  var _arguments2 = arguments;
  var f = function () {
    return _arguments2[0] + n;
  }; // foo's implicit arguments binding. arguments[0] is n
  return f();
}
