// Options: --block-binding

{
  let i = 0, called = 0;
  function f() {
    called++;
    return function() {
      return ++i;
    };
  }

  expect(f() `whatevs`).toBe(1);
  expect(called).toBe(1);
  expect(f `abc` `def`).toBe(2);
  expect(called).toBe(2);
  expect(f `ghi` ()).toBe(3);
  expect(called).toBe(3);
}
