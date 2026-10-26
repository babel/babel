var x = "outside";
function outer() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    return eval("x");
  };
  return function () {
    var x = "inside";
    return a();
  }();
}
outer();
