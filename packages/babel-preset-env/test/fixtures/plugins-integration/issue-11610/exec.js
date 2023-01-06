const arr = [];
async function v(source = 2) {
  for await (source of [1]) {
    arr.push(source);
  }
  expect(source).toEqual(1);
}
return v().then(() => {
  expect(arr).toEqual([1]);
});

