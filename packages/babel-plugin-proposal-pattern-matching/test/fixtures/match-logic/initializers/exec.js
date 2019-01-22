/*
  case (input) {
    // matches if `input` is an object, whether or not it has an `x` property, and
    // sets `x` to `1` if `x` does not already exist on the object. Does NOT
    // match if `input` is undefined.
    when {x: x = 1} -> ...
  }
*/

function match_xx1(input) {
  case (input) {
    when {x: x = 1} -> return x;
  }
  return false;
}

expect(match_xx1({})).toBe(1);
expect(match_xx1({x: 1})).toBe(1);
expect(match_xx1({x: 2})).toBe(2);
expect(match_xx1(undefined)).toBe(false);
expect(match_xx1(null)).toBe(false);
expect(match_xx1(1)).toBe(false);
expect(match_xx1(true)).toBe(false);
expect(match_xx1("a")).toBe(false);


/*
  case (input) {
    // And this one always succeeds if a status property existed, with any value,
    // and the initializer will never be executed (because the property was
    // defined already)
    when {status = 400} -> ...
  }
*/

function match_status400(input) {
  case (input) {
    when {status = 400} -> return status;
  }
  return false;
}

// TODO This differs from spec; I don't understand spec's intention here.
// Seems to me this should be pure shorthand for `{status: status = 400}`,
// and that's what this implementation does.
expect(match_status400({})).toBe(400);
expect(match_status400({status: 400})).toBe(400);
expect(match_status400({status: 200})).toBe(200);
expect(match_status400(undefined)).toBe(false);


/*
  case (input) {
    // initializers only execute if a match succeeds.
    // This example only matches if `status` was already 200 on input.
    when {status = 200} if (status === 200) -> ...
  }
*/

// TODO I don't understand the intention of this one; so, unimplemented.


/*
  case (input) {
    // matches `input` if it's an object. If `input` is `undefined`, match is set
    // to `{x: 1}`, and x is bound to 1.
    when {x} = {x: 1} -> ...
  }
*/

// TODO unimplemented; I don't understand the intention.
