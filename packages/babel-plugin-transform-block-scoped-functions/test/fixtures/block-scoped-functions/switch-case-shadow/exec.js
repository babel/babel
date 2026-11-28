const c = "outer";
let result;
switch (c) {
  case "outer":
    const c = "inner";
    function h() { return c; }
    result = h();
}
expect(result).toBe("inner");