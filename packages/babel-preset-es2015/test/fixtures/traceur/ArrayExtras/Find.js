// should have a length of 1
assert.equal(Array.prototype.find.length, 1);

// should handle basic case
assert.equal([1, 2, 3].find(function(v) {
  return v * v === 4;
}), 2);

// should handle arrow functions
assert.equal([1, 2, 3].find(v => v * v === 4), 2);

// should return undefined when not found
assert.equal([1, 2, 3].find(v => v > 10), undefined);

// should return first match
assert.equal([2, 2, 3].find(v => v * v === 4), 2);

// should handle custom objects
assert.equal(Array.prototype.find.call({
  'length': 2,
  '0': false,
  '1': true
}, v => v), true);

// should handle bad predicate
assert.throws(function() {
  [1, 2, 3].find(1)
}, TypeError);

// should handle bad this
assert.throws(function() {
  Array.prototype.find.call(null, function() {})
}, TypeError);

// should correctly handle this
var global = this;
({
  assert: function() {
    var self = this;

    // should be global this
    [1, 2, 3].find(function() {
      assert.notEqual(this, self);
      assert.equal(this, global);
    });

    // should be the same this
    [1, 2, 3].find(function() {
      assert.equal(this, self);
    }, self);

    // should not have an effect on arrow functions
    [1, 2, 3].find(() => assert.equal(this, self));
    [1, 2, 3].find(() => assert.equal(this, self), self);

    // should call with correct args
    var arr = [5];
    arr.find(function(value, i, object) {
      assert.equal(value, 5);
      assert.equal(i, 0);
      assert.equal(arr, object);
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

assert.equal(Array.prototype.find.call(object, (v) => {
  callbackCalls++;
  return v === 'a';
}), 'a');
assert.equal(lengthCalls, 1);
assert.equal(itemCalls, 1);
assert.equal(callbackCalls, 3);
