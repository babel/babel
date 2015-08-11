// should have a length of 1
assert.equal(Array.from.length, 1);
var arr;
var obj;

// should make an array from arguments
function arrayFromArgs() {
  return Array.from(arguments);
}
arr = arrayFromArgs('a', 1);

assert.equal(arr.length, 2);
assert.deepEqual(arr, ['a', 1]);
assert.isTrue(Array.isArray(arr));

// should handle undefined values
var arrayLike = {0: 'a', 2: 'c', length: 3};
arr = Array.from(arrayLike);

assert.equal(arr.length, 3);
assert.deepEqual(arr, ['a', undefined, 'c']);
assert.isTrue(Array.isArray(arr));

// should use a mapFn
arr = Array.from([{'a': 1}, {'a': 2}], function(item, i) {
  return item.a + i;
});

assert.deepEqual(arr, [1, 3]);

// should set this in mapFn
var thisObj = {a: 10};
arr = Array.from([{'a': 1}, {'a': 2}], function(item, i) {
  return this.a + item.a + i;
}, thisObj);

assert.deepEqual(arr, [11, 13]);

// should map on array-like object
arr = Array.from({0: {'a': 5}, length: 1}, function(item, i) {
  return item.a + i;
});

assert.deepEqual(arr, [5]);

// should throw on bad map fn
assert.throws(function() {
  Array.from([], null)
}, TypeError);

// should make from an array-like object
var arrayLikeObj = function(len) {
  this.length = len;
};
arrayLikeObj.from = Array.from;
obj = arrayLikeObj.from(['a', 'b', 'c']);

assert.equal(obj.length, 3);
assert.deepEqual(obj, {0: 'a', 1: 'b', 2: 'c', length: 3});

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

assert.equal(obj.length, 3);
assert.equal(obj[0], 'a');
assert.equal(obj[1], 'b');
assert.equal(obj[2], 'c');
assert.equal(calledIterator, 3);

// should make from a sub-classed array
var length = 0;
var constructorCounter = 0;
var lengthSetCounter = 0;
var lengthGetCounter = 0;

class MyArray extends Array {
  constructor(v) {
    super();
    constructorCounter++;
    assert.isUndefined(v);
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
assert.instanceOf(ma, MyArray);
assert.equal(constructorCounter, 1);
assert.equal(lengthSetCounter, 1);
assert.equal(lengthGetCounter, 0);
assert.isTrue(ma.hasOwnProperty('0'));
assert.isTrue(ma.hasOwnProperty('1'));
assert.isFalse(ma.hasOwnProperty('length'));
assert.equal(ma[0], 'a');
assert.equal(ma[1], 'b');
assert.equal(ma.length, 2);

// should make from a sub-classed array without iterable
length = 0;
constructorCounter = 0;
lengthSetCounter = 0;
lengthGetCounter = 0;

class MyArray2 extends MyArray {
  constructor(v) {
    super();
    constructorCounter++;
    assert.equal(v, 2);
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
assert.instanceOf(ma, MyArray2);
assert.equal(constructorCounter, 2);
assert.equal(lengthSetCounter, 1);
assert.equal(lengthGetCounter, 0);
assert.isTrue(ma.hasOwnProperty('0'));
assert.isTrue(ma.hasOwnProperty('1'));
assert.isFalse(ma.hasOwnProperty('length'));
assert.equal(ma[0], 'a');
assert.equal(ma[1], 'b');
assert.equal(ma.length, 2);
