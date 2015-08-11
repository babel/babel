// Options: --block-binding

function f() {
  return 'outer';
}

{
  function f() {
    return 'inner';
  }

  assert.equal('inner', f());
}

assert.equal('outer', f());
