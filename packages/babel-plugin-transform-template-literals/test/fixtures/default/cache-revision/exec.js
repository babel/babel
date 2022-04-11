var tag = v => v;

function foo() {
  return tag`some template`;
}
function bar() {
  return tag`some template`;
}
expect(foo()).toBe(foo());
expect(foo()).toEqual(["some template"]);

expect(bar()).toBe(bar());
expect(bar()).toEqual(["some template"]);

expect(bar()).not.toBe(foo());
