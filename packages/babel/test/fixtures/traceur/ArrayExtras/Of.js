var arr;

// should have a length of 0
assert.equal(Array.of.length, 0);

//should return an array from arguments
arr = Array.of(1, 'a', 3);
assert.deepEqual(arr, [1, 'a', 3]);
assert.isTrue(arr instanceof Array);

//should work with no arguments
arr = Array.of();
assert.deepEqual(arr, []);
assert.isTrue(arr instanceof Array);

//should work with sub-classed array
class MyArray extends Array {}

arr = MyArray.of(4, 'b');
assert.equal(arr[0], 4);
assert.equal(arr[1], 'b');
assert.equal(arr.length, 2);
assert.isTrue(arr instanceof MyArray);

//should call with exotic array
class ExoticArray {
  constructor(len) {
    this.length = len;
  }
}
arr = Array.of.call(ExoticArray, 5, 'c', 6, 'd');
assert.equal(arr[0], 5);
assert.equal(arr[1], 'c');
assert.equal(arr[2], 6);
assert.equal(arr[3], 'd');
assert.equal(arr.length, 4);
assert.isTrue(arr instanceof ExoticArray);
