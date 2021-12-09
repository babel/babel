var _arguments = typeof arguments === "undefined" ? void 0 : arguments;

var arguments = [1, 2, 3];

var arr = function arr() {
  return _arguments[0];
};

arr(); // 1

function foo(n) {
  var _arguments2 = arguments;

  var f = function f() {
    return _arguments2[0] + n;
  }; // foo's implicit arguments binding. arguments[0] is n


  return f();
}
