// Options: --block-binding

// These tests are from:
// http://wiki.ecmascript.org/doku.php?id=strawman:arrow_function_syntax

let empty = () => undefined;
expect(empty()).toBe(undefined);

// Expression bodies needs no parentheses or braces
let identity = (x) => x;
expect(identity(empty)).toBe(empty);

// Object literals needs to be wrapped in parens.
let keyMaker = (val) => ({key: val});
expect(keyMaker(empty).key).toBe(empty);

// => { starts a block.
let emptyBlock = () => {a: 42};
expect(emptyBlock()).toBe(undefined);

// Nullary arrow function starts with arrow (cannot begin statement)
const preamble = 'hello';
const body = 'world';
let nullary = () => preamble + ': ' + body;
expect('hello: world').toBe(nullary());

// No need for parens even for lower-precedence expression body
let square = x => x * x;
expect(81).toBe(square(9));

let oddArray = [];
let array = [2, 3, 4, 5, 6, 7];
array.forEach((v, i) => { if (i & 1) oddArray[i >>> 1] = v; });
expect('3,5,7').toBe(oddArray.toString());

var f = (x = 42) => x;
expect(42).toBe(f());

{
  let g = (...xs) => xs;
  expect(g(0, 1, true)).toEqual([0, 1, true]);;
}

var h = (x, ...xs) => xs;
expect(h(-1, 0, 1, true)).toEqual([0, 1, true]);;

expect(typeof (() => {})).toBe('function');
expect(Object.getPrototypeOf(() => {})).toBe(Function.prototype);

var i = ({a = 1}) => a;
expect(i({})).toBe(1);
expect(i({a: 2})).toBe(2);
