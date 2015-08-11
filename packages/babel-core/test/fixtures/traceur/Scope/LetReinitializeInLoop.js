(function() {
  var i = 0;
  while (i < 3) {
    let x;
    assert.equal(undefined, x);
    x = i;
    i++;
  }
})();
