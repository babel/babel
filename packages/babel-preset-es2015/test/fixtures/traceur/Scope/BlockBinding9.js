// Options: --block-binding

function f() {
  return 'outer';
}

{
  (function f() {
    return 'inner';
  });

  expect(f()).toBe('outer');
}

expect(f()).toBe('outer');
