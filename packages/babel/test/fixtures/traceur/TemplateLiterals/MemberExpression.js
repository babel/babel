// Options: --block-binding

{
  let a = [function() {
    return 1;
  }];

  assert.equal(1, a[0] `whatevs`);

  function f() {
    return [function() {
      return 2;
    }];
  }

  assert.equal(2, f `abc` [0] `def`);

  let o = {
    g: function() {
      return 3;
    }
  };

  assert.equal(3, o.g `ghi`);
}
