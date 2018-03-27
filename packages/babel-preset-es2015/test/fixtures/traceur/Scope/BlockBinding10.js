// Options: --block-binding

function f() {
  return 'outer';
}

{
  var f = function f() {
    return 'inner';
  };

  expect(f()).toBe('inner');
}

expect(f()).toBe('inner');
