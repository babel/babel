let i = 0;
let sum = 0;
while (_ref = i, (i = 2 * _ref - _ref + 1) <= 10) {
  var _ref;
  sum += i;
}
expect(sum).toBe(10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1);
