expect(do {
  var i = 5;
  do { i--; } while(i > 3);
  i;
}).toBe(3);
