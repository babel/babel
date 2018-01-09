var IdenticalName = function () {
  function IdenticalName(x) {
    return x;
  }

  return IdenticalName;
}();

(function () {
  function foo() {}

  return foo;
})();
