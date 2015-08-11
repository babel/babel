// Options: --block-binding

(function() {
  var y;
  for (var x in {a: 'A'}) {
    assert.equal(x, 'a');
    y = x;
  }
  assert.equal(y, 'a');
})();
