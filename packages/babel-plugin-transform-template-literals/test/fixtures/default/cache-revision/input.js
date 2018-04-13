var tag = v => v;

function foo() {
  return tag`some template`;
}
function bar() {
  return tag`some template`;
}
assert.equal(foo(), foo());
assert.equal(bar(), bar());
assert.notEqual(foo(), bar());
