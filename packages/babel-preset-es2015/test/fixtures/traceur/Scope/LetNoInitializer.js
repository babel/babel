// Options: --block-binding

var x = 1;
{
  let x;
  expect(x).toBeUndefined();;
  x = 2;
  expect(x).toBe(2);
}
expect(x).toBe(1);
