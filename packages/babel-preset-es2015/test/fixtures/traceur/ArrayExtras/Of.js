var arr;

// should have a length of 0
expect(Array.of.length).toBe(0);

//should return an array from arguments
arr = Array.of(1, 'a', 3);
expect(arr).toEqual([1, 'a', 3]);
// expect(arr).toBeInstanceof(Array);

//should work with no arguments
arr = Array.of();
expect(arr).toEqual([]);
// expect(arr).toBeInstanceof(Array);

//should work with sub-classed array
class MyArray extends Array {}

arr = MyArray.of(4, 'b');
expect(arr[0]).toBe(4);
expect(arr[1]).toBe('b');
expect(arr).toHaveLength(2);
// expect(arr).toBeInstanceof(MyArray);

//should call with exotic array
class ExoticArray {
  constructor(len) {
    this.length = len;
  }
}
arr = Array.of.call(ExoticArray, 5, 'c', 6, 'd');
expect(arr[0]).toBe(5);
expect(arr[1]).toBe('c');
expect(arr[2]).toBe(6);
expect(arr[3]).toBe('d');
expect(arr).toHaveLength(4);
expect(arr).toBeInstanceOf(ExoticArray);
