var tag = v => v;

function foo() {
  return tag`some template`;
}
function bar() {
  return tag`some template`;
}
expect(foo()).toBe(foo());
expect(bar()).toBe(bar());
expect(bar()).not.toBe(foo());
