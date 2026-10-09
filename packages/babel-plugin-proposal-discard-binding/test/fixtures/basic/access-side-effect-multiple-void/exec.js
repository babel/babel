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
    yield;
    this.length++;
    yield new MyObject;
  }
}

var arr = new MyArray;
var [void, void, { p: void, p: void, ...rest1 }, ...rest2] = arr;

expect(rest1).toEqual({ pAccessCount: 2 });
expect(rest2).toEqual([]);
expect(arr.length).toBe(3);
