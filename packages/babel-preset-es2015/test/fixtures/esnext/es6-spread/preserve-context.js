var MATH = {
  sum: function(...numbers) {
    return numbers.reduce(this.add, 0);
  },

  add: function(a, b) {
    return a + b;
  }
};

expect(MATH.sum(1, ...[2, 3])).toBe(6);

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
expect(ops).toEqual(['getSelf', 'doCall', obj]);

ops = [];
obj['getSelf']().doCall(...[]);
expect(ops).toEqual(['getSelf', 'doCall', obj]);
