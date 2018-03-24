// should have a length of 1
expect(Array.from.length).toBe(1);
var arr;
var obj;

// should make an array from arguments
function arrayFromArgs() {
  return Array.from(arguments);
}
arr = arrayFromArgs('a', 1);

expect(arr.length).toBe(2);
expect(arr).toEqual(['a', 1]);
expect(Array.isArray(arr)).toBe(true);

// should handle undefined values
var arrayLike = {0: 'a', 2: 'c', length: 3};
arr = Array.from(arrayLike);

expect(arr.length).toBe(3);
expect(arr).toEqual(['a', undefined, 'c']);
expect(Array.isArray(arr)).toBe(true);

// should use a mapFn
arr = Array.from([{'a': 1}, {'a': 2}], function(item, i) {
  return item.a + i;
});

expect(arr).toEqual([1, 3]);

// should set this in mapFn
var thisObj = {a: 10};
arr = Array.from([{'a': 1}, {'a': 2}], function(item, i) {
  return this.a + item.a + i;
}, thisObj);

expect(arr).toEqual([11, 13]);

// should map on array-like object
arr = Array.from({0: {'a': 5}, length: 1}, function(item, i) {
  return item.a + i;
});

expect(arr).toEqual([5]);

// should throw on bad map fn
expect(function() {
  Array.from([], null)
}).toThrow();

// should make from an array-like object
var arrayLikeObj = function(len) {
  this.length = len;
};
arrayLikeObj.from = Array.from;
obj = arrayLikeObj.from(['a', 'b', 'c']);

expect(obj).toHaveLength(3);
expect(obj).toEqual({0: 'a', 1: 'b', 2: 'c', length: 3});

// should make from a non-array iterable
var calledIterator = 0;
var Iterable = function(len) {
  var self = this;

  self.length = len;
  self[Symbol.iterator] = function*() {
    for (var i = 0; i < self.length; i++) {
      calledIterator++;
      yield self[i];
    }
  };
};
var it = new Iterable(3);
it[0] = 'a';
it[1] = 'b';
it[2] = 'c';
obj = Array.from(it);

expect(obj).toHaveLength(3);
expect(obj[0]).toBe('a');
expect(obj[1]).toBe('b');
expect(obj[2]).toBe('c');
expect(calledIterator).toBe(3);

// should make from a sub-classed array
var length = 0;
var constructorCounter = 0;
var lengthSetCounter = 0;
var lengthGetCounter = 0;

class MyArray extends Array {
  constructor(v) {
    super();
    constructorCounter++;
    expect(v).toBeUndefined();
  }

  set length(v) {
    lengthSetCounter++;
    length = v;
  }

  get length() {
    lengthGetCounter++;
    return length;
  }
}

var ma = MyArray.from(['a', 'b']);
expect(ma instanceof MyArray).toBe(true);
expect(constructorCounter).toBe(1);
expect(lengthSetCounter).toBe(1);
expect(lengthGetCounter).toBe(0);
expect(ma).toContain('0');
expect(ma).toContain('1');
expect(ma).not.toContain('length');
expect(ma[0]).toBe('a');
expect(ma[1]).toBe('b');
expect(ma).toHaveLength(2);

// should make from a sub-classed array without iterable
length = 0;
constructorCounter = 0;
lengthSetCounter = 0;
lengthGetCounter = 0;

class MyArray2 extends MyArray {
  constructor(v) {
    super();
    constructorCounter++;
    expect(v).toBe(2);
  }
};
MyArray2.prototype[Symbol.iterator] = undefined;

class MyArray3 extends Array {
  constructor(v) {
    super();
    this.length = v;
  }
}
MyArray3.prototype[Symbol.iterator] = undefined;

var ma3 = new MyArray3(2);
ma3[0] = 'a';
ma3[1] = 'b';
ma = MyArray2.from(ma3);
expect(ma instanceof MyArray2).toBe(true);
expect(constructorCounter).toBe(2);
expect(lengthSetCounter).toBe(1);
expect(lengthGetCounter).toBe(0);
expect(ma).toContain('0');
expect(ma).toContain('1');
expect(ma).not.toContain('length');
expect(ma[0]).toBe('a');
expect(ma[1]).toBe('b');
expect(ma).toHaveLength(2);
