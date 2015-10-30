while( true ) {
  let foo = 1;
  assert.equal(1, (() => foo)());
  break;
}
