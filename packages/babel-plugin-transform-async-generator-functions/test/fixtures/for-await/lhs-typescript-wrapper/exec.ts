async function f() {
  const result = [];
  let a;
  for await ((a as any) of [1, 2]) {
    result.push(a);
  }
  const b: { c?: number } = {};
  for await (b.c! of [3, 4]) result.push(b.c);
  return result;
}

return f().then(result => {
  expect(result).toEqual([1, 2, 3, 4]);
});
