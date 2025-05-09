class MyObject {
  pAccessCount = 0;
  get p() {
    this.pAccessCount++;
    return 0;
  }
}
class MyArray {
  length = 0;
  *[Symbol.iterator]() {
    this.length++;
    yield;
    this.length++;
    yield new MyObject();
  }
}
var arr = new MyArray();
var _arr = babelHelpers.toArray(arr),
  _arr$ = _arr[1],
  _ = _arr$.p,
  rest1 = babelHelpers.objectWithoutProperties(_arr$, ["p"]),
  rest2 = _arr.slice(2);
