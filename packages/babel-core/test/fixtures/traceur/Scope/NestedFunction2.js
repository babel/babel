// Options: --block-binding

function nestedFunction2() {
  let let_func = function() {
    let let_x = 'let x';
  }
  return let_func;
}

// ----------------------------------------------------------------------------
