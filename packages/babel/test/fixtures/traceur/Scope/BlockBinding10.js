// Options: --block-binding

function f() {
  return 'outer';
}

{
  var f = function f() {
    return 'inner';
  };

  assert.equal('inner', f());
}

assert.equal('inner', f());
