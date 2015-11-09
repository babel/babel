assert.equal(do {
  var i = 5;
  while (i > 3) i--;
  i;
}, 3);
