const a = 1;
function rest(b = a, ...a) {
  assert.equal(b, 1);
}
rest(undefined, 2)

function rest2(b = a, ...a) {
  assert.equal(a[0], 2);
}
rest2(undefined, 2)

function rest3(b = a, ...a) {
  assert.equal(a.length, 1);
}
rest3(undefined, 2)
