var c = "outer";
var result;
{
  var _c;
  var h = function h() {
    return _c;
  };
  switch (c) {
    case "outer":
      _c = "inner";
      result = h();
  }
}
expect(result).toBe("inner");
