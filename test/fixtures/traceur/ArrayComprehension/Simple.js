// Options: --array-comprehension

function* range() {
  for (var i = 0; i < 5; i++) {
    yield i;
  }
}

var array = [for (x of [0, 1, 2, 3]) x];
assertArrayEquals([0, 1, 2, 3], array);

var array2 = [for (x of [0, 1, 2]) for (y of [0, 1, 2]) x + '' + y];
assertArrayEquals(['00', '01', '02', '10', '11', '12', '20', '21', '22'],
             array2);

var array3 = [
    for (x of [0, 1, 2, 3, 4])
      for (y of range())
        if (x === y)
          x + '' + y];
assertArrayEquals(['00', '11', '22', '33', '44'], array3);

// Ensure this works as expression statement
[for (testVar of []) testVar];

var array4 = [
  for (x of range())
    if (x % 2 === 0)
      for (y of range())
        if (y % 2 === 1)
          x + '' + y];
assertArrayEquals(['01', '03', '21', '23', '41', '43'], array4);
