var obj = {
  method: function(...args) {
    return {
      self: this,
      args: args
    };
  }
};

var result = {
  obj: obj,
  result: obj['meth' + 'od'](0, ...[1, 2], 3)
};

// ----------------------------------------------------------------------------

expect(result.obj).toBe(result.result.self);
expect(result.result.args).toEqual([0, 1, 2, 3]);;
