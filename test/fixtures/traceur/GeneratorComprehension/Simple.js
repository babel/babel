// Options: --generator-comprehension

function accumulate(iterator) {
  var result = '';
  for (var value of iterator) {
    result = result + String(value);
  }
  return result;
}

function* range() {
  for (var i = 0; i < 5; i++) {
    yield i;
  }
}

var iter = (for (x of [0, 1, 2, 3, 4]) x);
assert.equal('01234', accumulate(iter));

var iter2 = (for (x of [0, 1, 2, 3, 4]) for (y of [0, 1, 2, 3, 4]) x + '' + y );
assert.equal('00010203041011121314202122232430313233344041424344',
             accumulate(iter2));

var iter3 = (
    for (x of [0, 1, 2, 3, 4])
      for (y of range())
        if (x === y)
          x + '' + y);
assert.equal('0011223344', accumulate(iter3));

// Ensure this works as expression statement
(for (testVar of []) testVar);

var iter4 = (
  for (x of range())
    if (x % 2 === 0)
      for (y of range())
        if (y % 2 === 1)
          x + '' + y);
assert.equal('010321234143', accumulate(iter4));
