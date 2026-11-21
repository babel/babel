{
  var n, y;
  var h = function h() {
    n++;
    return y + n;
  };
  switch (2) {
    case 1:
      var unused = 0;
    case 2:
      y = 1;
      var x = y + 1;
      var z = 100;
      n = 0;
      expect(h()).toBe(2);
      expect(h()).toBe(3);
      expect(x).toBe(2);
      expect(z).toBe(100);
  }
}
