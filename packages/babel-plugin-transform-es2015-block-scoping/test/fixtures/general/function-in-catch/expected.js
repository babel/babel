try {
  foo();
} catch (x) {
  var harmless = function (x) {
    return x;
  };
}
