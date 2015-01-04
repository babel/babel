// Options: --block-binding

function f() {
  return 'outer';
}

{
  (function f() {
    return 'inner';
  });

  assert.equal('outer', f());
}

assert.equal('outer', f());
