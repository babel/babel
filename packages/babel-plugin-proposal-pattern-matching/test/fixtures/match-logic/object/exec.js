
function match_x(input) {
  case (input) {
    when {x} -> return x;
  }
  return false;
}

expect(match_x({x: 1})).toBe(1);
expect(match_x({x: "x"})).toBe("x");
expect(match_x({x: undefined})).toBe(false);
expect(match_x({})).toBe(false);
expect(match_x([1])).toBe(false);
expect(match_x(null)).toBe(false);
expect(match_x(undefined)).toBe(false);


/*
  case (input) {
    when {x: 1} -> ... // matches if `input` can do ToObject and `input.x` is 1
  }
*/

function match_x1(input) {
  case (input) {
    when {x: 1} -> return true;
  }
  return false;
}

expect(match_x1({x: 1})).toBe(true);
expect(match_x1({x: 2})).toBe(false);
expect(match_x1(null)).toBe(false);
expect(match_x1(undefined)).toBe(false);
expect(match_x1({x: 1, y: 2})).toBe(true);
expect(match_x1({x: "1"})).toBe(false);
expect(match_x1({x: null})).toBe(false);
expect(match_x1({x: undefined})).toBe(false);
expect(match_x1({x: 1.0})).toBe(true);
