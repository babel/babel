async function * foo (p = 1) {
  yield "hello";
  yield p;
}

return (async () => {
  const res = [];
  for await (const x of foo()) res.push(x);
  expect(res).toEqual(["hello", 1]);
})();
