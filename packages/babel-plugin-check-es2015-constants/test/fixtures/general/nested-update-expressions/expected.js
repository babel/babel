var c = 17;
var a = 0;

function f() {
  return (function () {
    throw new Error("\"c\" is read-only");
  }(), ++c) + --a;
}
