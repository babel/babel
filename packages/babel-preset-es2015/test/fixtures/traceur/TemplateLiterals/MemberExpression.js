// Options: --block-binding

{
  let a = [function() {
    return 1;
  }];

  expect(a[0] `whatevs`).toBe(1);

  function f() {
    return [function() {
      return 2;
    }];
  }

  expect(f `abc` [0] `def`).toBe(2);

  let o = {
    g: function() {
      return 3;
    }
  };

  expect(o.g `ghi`).toBe(3);
}
