
/*
  case (input) {
    when [1,2] -> ... // matches if `input` can do GetIterator, has exactly 2 items,
                      //   and the items are 1, then 2.
  }
*/

function match_1_2(input) {
  case (input) {
    when [1, 2] -> return true;
  }
  return false;
}

expect(match_1_2([1, 2])).toBe(true);
expect(match_1_2([1])).toBe(false);
expect(match_1_2([1, 2, 3])).toBe(false);
expect(match_1_2([2, 1])).toBe(false);
expect(match_1_2([1, undefined])).toBe(false);


function match_1_x(input) {
  case (input) {
    when [1, x] -> return true;
  }
  return false;
}

// An element of `undefined` doesn't match even a general pattern.
expect(match_1_x([1, undefined])).toBe(false);
expect(match_1_2([1, 2, undefined])).toBe(false);


function match_1_x_y(input) {
  case (input) {
    when [1, x, y] -> return [x, y];
  }
  return false;
}

expect(match_1_x_y([1, 2, 3])).toEqual([2, 3]);
expect(match_1_x_y([1, 2, 3, 4])).toBe(false);
expect(match_1_x_y([1, 2])).toBe(false);
expect(match_1_x_y([1, 2, undefined])).toBe(false);
expect(match_1_x_y([1, undefined, 3])).toBe(false);
expect(match_1_x_y([undefined, 2, 3])).toBe(false);
expect(match_1_x_y([null, 2, 3])).toBe(false);
expect(match_1_x_y([0, 2, 3])).toBe(false);
expect(match_1_x_y([[1], 2, 3])).toBe(false);


// `undefined` on the RHS is a *binding*, for a local to shadow the real `undefined`.
function match_1_undefined(input) {
  case (input) {
    when [1, undefined] -> return undefined;
  }
  return false;
}

expect(match_1_undefined([1, 2])).toBe(2);
expect(match_1_undefined([1])).toBe(false);


// TODO test other things that can do GetIterator -- and that can't
