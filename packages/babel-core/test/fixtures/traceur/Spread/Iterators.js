function* G() {
  yield 1;
  yield 2;
  yield 3;
}

var a = [...G()];
var b = [4, ...G()];
var c = [...G(), 4];
var d = [4, ...G(), 5];

// ----------------------------------------------------------------------------

assertArrayEquals([1, 2, 3], a);
assertArrayEquals([4, 1, 2, 3], b);
assertArrayEquals([1, 2, 3, 4], c);
assertArrayEquals([4, 1, 2, 3, 5], d);
