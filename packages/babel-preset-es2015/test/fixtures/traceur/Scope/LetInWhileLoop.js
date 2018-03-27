while( true ) {
  let foo = 1;
  expect((() => foo)()).toBe(1);
  break;
}
