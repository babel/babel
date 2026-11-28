async function f() {
  const result = [];
  let a, b;
  const o = {};
  for await ((a) of [1]) result.push(a);
  for await (((b)) of [2]) result.push(b);
  for await ((o.p) of [3]) result.push(o.p);
  return result;
}

return f().then(result => {
  expect(result).toEqual([1, 2, 3]);
});
