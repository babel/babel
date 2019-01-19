
/*
  case (input) {
    when 1 -> ... // matches if `input` is 1
    when 'foo' -> ... // matches if `input` is 'foo'
    when false -> ... // matches if `input` is `false`
    when null -> ... // matches if `input` is `null`
  }
*/

function match_1(input) {
  case (input) {
    when 1 -> return true;
  }
  return false;
}

expect(match_1(1)).toBe(true);
expect(match_1(2)).toBe(false);
expect(match_1(null)).toBe(false);
expect(match_1(undefined)).toBe(false);
expect(match_1(NaN)).toBe(false);

// TODO more simple stuff here


// But NaN is just a name, and gets bound, shadowing the global `NaN`.
function match_NaN(input) {
  case (input) {
    when NaN -> return NaN;
  }
  return false;
}

expect(match_NaN(2)).toBe(2);


// Ditto `undefined`.
function match_undefined(input) {
  case (input) {
    when undefined -> return undefined;
  }
  return false;
}

expect(match_undefined(2)).toBe(2);
expect(match_undefined(undefined)).toBe(undefined);
