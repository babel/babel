// Options: --block-binding

for (var x in [1,2,3]) {
  let let_y = x;
  for (var for_in_z in [4,5,6]) {
    continue;
  }
}

// ----------------------------------------------------------------------------
