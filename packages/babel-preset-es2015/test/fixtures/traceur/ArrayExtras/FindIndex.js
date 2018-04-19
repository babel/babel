// should have a length of 1
expect(Array.prototype.findIndex.length).toBe(1);

// should handle basic case
expect([1, 2, 3].findIndex(function(v) {
  return v * v === 4;
})).toBe(1);

// should handle arrow functions
expect([1, 2, 3].findIndex(v => v * v === 4)).toBe(1);

// should return -1 when not found
expect([1, 2, 3].findIndex(v => v > 10)).toBe(-1);

// should return first match
expect([2, 2, 3].findIndex(v => v * v === 4)).toBe(0);

// should handle custom objects
expect(Array.prototype.findIndex.call({
  'length': 2,
  '0': false,
  '1': true
}, v => v)).toBe(1);

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

expect(Array.prototype.findIndex.call(object, (v) => {
  callbackCalls++;
  return v === 'a';
})).toBe(2);
expect(lengthCalls).toBe(1);
expect(itemCalls).toBe(1);
expect(callbackCalls).toBe(3);
