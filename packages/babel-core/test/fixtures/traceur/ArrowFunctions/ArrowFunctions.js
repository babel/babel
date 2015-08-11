// Options: --block-binding

// These tests are from:
// http://wiki.ecmascript.org/doku.php?id=strawman:arrow_function_syntax

let empty = () => undefined;
assert.equal(empty(), undefined);

// Expression bodies needs no parentheses or braces
let identity = (x) => x;
assert.equal(identity(empty), empty);

// Object literals needs to be wrapped in parens.
let keyMaker = (val) => ({key: val});
assert.equal(keyMaker(empty).key, empty);

// => { starts a block.
let emptyBlock = () => {a: 42};
assert.equal(emptyBlock(), undefined);

// Nullary arrow function starts with arrow (cannot begin statement)
const preamble = 'hello';
const body = 'world';
let nullary = () => preamble + ': ' + body;
assert.equal('hello: world', nullary());

// No need for parens even for lower-precedence expression body
let square = x => x * x;
assert.equal(81, square(9));

let oddArray = [];
let array = [2, 3, 4, 5, 6, 7];
array.forEach((v, i) => { if (i & 1) oddArray[i >>> 1] = v; });
assert.equal('3,5,7', oddArray.toString());

var f = (x = 42) => x;
assert.equal(42, f());

{
  let g = (...xs) => xs;
  assertArrayEquals([0, 1, true], g(0, 1, true));
}

var h = (x, ...xs) => xs;
assertArrayEquals([0, 1, true], h(-1, 0, 1, true));

assert.equal(typeof (() => {}), 'function');
assert.equal(Object.getPrototypeOf(() => {}), Function.prototype);

var i = ({a = 1}) => a;
assert.equal(i({}), 1);
assert.equal(i({a: 2}), 2);
