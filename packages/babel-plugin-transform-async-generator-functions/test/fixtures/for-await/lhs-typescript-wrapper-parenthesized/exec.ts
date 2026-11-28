async function f() {
  const result = [];
  let a, c;
  for await (((a as any)) of [1]) result.push(a);
  for await ((c!) of [3]) result.push(c);
  return result;
}

return f().then(result => {
  expect(result).toEqual([1, 3]);
});
