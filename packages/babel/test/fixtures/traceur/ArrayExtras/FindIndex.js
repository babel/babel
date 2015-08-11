// should have a length of 1
assert.equal(Array.prototype.findIndex.length, 1);

// should handle basic case
assert.equal([1, 2, 3].findIndex(function(v) {
  return v * v === 4;
}), 1);

// should handle arrow functions
assert.equal([1, 2, 3].findIndex(v => v * v === 4), 1);

// should return -1 when not found
assert.equal([1, 2, 3].findIndex(v => v > 10), -1);

// should return first match
assert.equal([2, 2, 3].findIndex(v => v * v === 4), 0);

// should handle custom objects
assert.equal(Array.prototype.findIndex.call({
  'length': 2,
  '0': false,
  '1': true
}, v => v), 1);

var lengthCalls = 0;
var itemCalls = 0;
var callbackCalls = 0;
var object = {
  length: {
    valueOf() {
      lengthCalls++;
      return 3;
    }
  },
  get 2() {
    itemCalls++;
    return 'a';
  }
};

assert.equal(Array.prototype.findIndex.call(object, (v) => {
  callbackCalls++;
  return v === 'a';
}), 2);
assert.equal(lengthCalls, 1);
assert.equal(itemCalls, 1);
assert.equal(callbackCalls, 3);
