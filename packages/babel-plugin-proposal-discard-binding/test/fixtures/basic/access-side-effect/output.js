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
var [, {
  p: _,
  ...rest1
}, ...rest2] = arr;
