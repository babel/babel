{
  var c;
  var h = function h() {
    return c;
  };
  switch (1) {
    case 1:
      c = "ok";
      expect(h()).toBe("ok");
  }
}
