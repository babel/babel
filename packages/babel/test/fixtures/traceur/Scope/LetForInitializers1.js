// Options: --block-binding

var result;
{
  let let_x = 'let x';
  let let_l = [];
  for (var var_x = 1, var_y = 2, var_z = 3; var_x < 10; var_x ++) {
     let l_x = var_x, l_y = var_y, l_z = var_z;
     let_l.push( function() { return [ l_x, l_y, l_z ]; } );
  }
  result = let_l;
}

// ----------------------------------------------------------------------------
