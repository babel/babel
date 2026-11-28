function f() {
  var outerX;
  {
    var x = function () {};
    outerX = x;
  }
  {
    {
      var _x2 = function () {};
    }
    var _x;
  }
  {
    var _x4;
    {
      var _x3 = function () {};
    }
  }
  return x === outerX;
}
