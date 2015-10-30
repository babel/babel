var MATH = {
  sum: function(...numbers) {
    return numbers.reduce(this.add, 0);
  },

  add: function(a, b) {
    return a + b;
  }
};

assert.equal(MATH.sum(1, ...[2, 3]), 6);

// Ensure that the below does not expand to this:
//
//   obj.getSelf().call.apply(obj.getSelf(), []);
//

var ops = [];
var obj = {
  getSelf: function() {
    ops.push('getSelf');
    return this;
  },

  doCall: function() {
    ops.push('doCall', this);
  }
};

obj.getSelf().doCall(...[]);
assert.deepEqual(ops, ['getSelf', 'doCall', obj]);

ops = [];
obj['getSelf']().doCall(...[]);
assert.deepEqual(ops, ['getSelf', 'doCall', obj]);
