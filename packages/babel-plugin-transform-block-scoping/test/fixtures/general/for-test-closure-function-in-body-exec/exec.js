var result = (function () {
  var f = [], n = 0;
  for (let i = 0; f.push(() => i), typeof g == "undefined" && n++ < 2; i++) {
    function g() {}
  }
  return [typeof g, n];
})();

expect(result).toEqual(["function", 1]);
