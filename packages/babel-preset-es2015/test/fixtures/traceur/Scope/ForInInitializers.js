// Options: --block-binding

(function() {
  var y;
  for (var x in {a: 'A'}) {
    expect(x).toBe('a');
    y = x;
  }
  expect(y).toBe('a');
})();
