(function() {
  var i = 0;
  while (i < 3) {
    let x;
    expect(x).toBeUndefined();
    x = i;
    i++;
  }
})();
