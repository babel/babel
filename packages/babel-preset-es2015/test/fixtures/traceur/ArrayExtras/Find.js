// should have a length of 1
expect(Array.prototype.find.length).toBe(1);

// should handle basic case
expect([1, 2, 3].find(function(v) {
  return v * v === 4;
})).toBe(2);

// should handle arrow functions
expect([1, 2, 3].find(v => v * v === 4)).toBe(2);

// should return undefined when not found
expect([1, 2, 3].find(v => v > 10)).toBeUndefined();

// should return first match
expect([2, 2, 3].find(v => v * v === 4)).toBe(2);

// should handle custom objects
expect(Array.prototype.find.call({
  'length': 2,
  '0': false,
  '1': true
}, v => v)).toBe(true);

// should handle bad predicate
expect(function() {
  [1, 2, 3].find(1)
}).toThrow('TypeError');

// should handle bad this
expect(function() {
  Array.prototype.find.call(null, function() {})
}).toThrow('TypeError');

// should correctly handle this
var global = this;
({
  assert: function() {
    var self = this;

    // should be global this
    [1, 2, 3].find(function() {
      expect(this).not.toBe(self);
      expect(this).toBe(global);
    });

    // should be the same this
    [1, 2, 3].find(function() {
      expect(this).toBe(self);
    }, self);

    // should not have an effect on arrow functions
    [1, 2, 3].find(() => expect(this).toBe(self));
    [1, 2, 3].find(() => expect(this).toBe(self), self);

    // should call with correct args
    var arr = [5];
    arr.find(function(value, i, object) {
      expect(value).toBe(5);
      expect(i).toBe(0);
      expect(arr).toBe(object);
    });
  }
}).assert();

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

expect(Array.prototype.find.call(object, (v) => {
  callbackCalls++;
  return v === 'a';
})).toBe('a');
expect(lengthCalls).toBe(1);
expect(itemCalls).toBe(1);
expect(callbackCalls).toBe(3);
