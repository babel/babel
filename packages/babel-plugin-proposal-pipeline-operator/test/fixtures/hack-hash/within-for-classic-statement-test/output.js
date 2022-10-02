let sum = 0;
for (var i = 0; _ref = i, _ref + _ref <= 20; i++) {
  var _ref;
  sum = sum + i;
}
expect(sum).toBe(10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1);
