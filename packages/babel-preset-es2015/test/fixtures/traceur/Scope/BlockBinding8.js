// Options: --block-binding

function f() {
  return 'outer';
}

{
  function f() {
    return 'inner';
  }

  expect(f()).toBe('inner');
}

expect(f()).toBe('outer');
