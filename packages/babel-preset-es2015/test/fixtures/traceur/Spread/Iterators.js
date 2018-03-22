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

expect(a).toEqual([1, 2, 3]);;
expect(b).toEqual([4, 1, 2, 3]);;
expect(c).toEqual([1, 2, 3, 4]);;
expect(d).toEqual([4, 1, 2, 3, 5]);;
