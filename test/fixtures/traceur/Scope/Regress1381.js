function test() {
  let ret = true;
  while (false)
    for (let i = 0; i < 1; i++)
      ret = () => i;
  return ret
}
assert.isTrue(test());
