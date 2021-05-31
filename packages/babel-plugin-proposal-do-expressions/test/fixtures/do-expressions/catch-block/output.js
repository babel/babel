var x = function () {
  try {
    return a();
  } catch (e) {
    return b();
  }
}();
