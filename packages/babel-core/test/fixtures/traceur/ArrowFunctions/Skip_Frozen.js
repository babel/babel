// Skip. Not implemented.

// TODO: needs # prefix implemented for freezing
// Use # to freeze and join to nearest relevant closure
function return_pure() {
  return #(a) -> a * a;
}

let p = return_pure(),
    q = return_pure();
assert(p === q);

function check_frozen(o) {
  try {
    o.x = "expando";
    assert(! "reached");
  } catch (e) {
    // e is something like "TypeError: o is not extensible"
    assert(e.name == "TypeError");
  }
}

check_frozen(p);

function partial_mul(a) {
  return #(b) -> a * b;
}

let x = partial_mul(3),
    y = partial_mul(4),
    z = partial_mul(3);

assert(x !== y);
assert(x !== z);
assert(y !== z);

check_frozen(x);
check_frozen(y);
check_frozen(z);
