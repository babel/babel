const a = 1;
function rest(b = a, ...a) {
  expect(b).toBe(1);
}
rest(undefined, 2)

function rest2(b = a, ...a) {
  expect(a[0]).toBe(2);
}
rest2(undefined, 2)

function rest3(b = a, ...a) {
  expect(a).toHaveLength(1);
}
rest3(undefined, 2)
