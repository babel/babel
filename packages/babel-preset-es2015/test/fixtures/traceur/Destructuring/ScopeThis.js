function destructScopeThis() {
  var x;
  var o = {
    f: function() {
      [this.x] = [1];
    }
  };
  o.f();
  return {
    x: x,
    o_x: o.x
  };
}

// ----------------------------------------------------------------------------

var result = destructScopeThis();
expect(result.x).toBeUndefined();
expect(result.o_x).toBe(1);
