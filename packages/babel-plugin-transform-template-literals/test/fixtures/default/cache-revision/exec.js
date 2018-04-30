// var tag = v => v;
//
// function foo() {
//   return tag`some template`;
// }
// function bar() {
//   return tag`some template`;
// }
// expect(foo()).toBe(foo());
// expect(foo()).toEqual(["some template"]);
//
// expect(bar()).toBe(bar());
// expect(bar()).toEqual(["some template"]);
//
// expect(bar()).not.toBe(foo());

const tagger = (strings) => strings;

function text(value) {
  return tagger`some ${value} strings`;
}

const foo = text(); // => ["some ", " strings"]
const bar = text('hello'); // => ["some ", " strings"]

expect(Array.isArray(foo)).toBe(true);
expect(Array.isArray(bar)).toBe(true);

// Yes, even though bar was passed "hello".
// The expressions passed to the template literal (inside the `${}`)
// are not part of the Strings array. Only the literal strings are in it.
expect(foo).toBe(bar);
