
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


/*
  Just like in destructuring, an object pattern can mention keys that
  aren't valid identifiers -- so long as it doesn't try to bind them.
*/

function match_nonident(input) {
  case (input) {
    when {case: 1} -> return 1;
    when {"case": 2} -> return 2;
    when {0: 3} -> return 3;
  }
  return false;
}

expect(match_nonident({case: 1})).toBe(1);
expect(match_nonident({case: 2})).toBe(2);
expect(match_nonident({case: 3})).toBe(false);
expect(match_nonident({0: 3})).toBe(3);
expect(match_nonident({0: 3, case: 1})).toBe(1);
expect(match_nonident({})).toBe(false);
expect(match_nonident(undefined)).toBe(false);


/*
  Object patterns don't match non-objects like strings, even if they
  have the given property.

  TODO compare this with spec, and reconcile.
*/

function match_0(input) {
  case (input) {
    when {0: v} -> return v;
  }
  return false;
}

expect(match_0("abc")).toBe(false);
expect(match_0([4, 5, 6])).toBe(4); // TODO choose the behavior here
expect(match_0({0: 1})).toBe(1);
expect(match_0({})).toBe(false);


/*
  case (input) {
    when {x, ...y} -> ... // binds all-other-properties to `y`.
    when {x, ...{y}} -> ... // SyntaxError -- see parser tests
  }
*/

function match_x_rest(input) {
  case (input) {
    when {x, ...rest} -> return [x, rest];
  }
  return false;
}

expect(match_x_rest({x: 1, y: 2})).toEqual([1, {y: 2}]);
expect(match_x_rest({x: 1})).toEqual([1, {}]);
expect(match_x_rest({y: 2})).toBe(false);
