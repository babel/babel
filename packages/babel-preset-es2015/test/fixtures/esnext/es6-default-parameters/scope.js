function call(fn, context=this) {
  return fn.call(context);
}

var context = {a: 99};

// use the default parameter
expect(call.call(context, function(){ return this.a; })).toBe(99);

// explicitly provide the default parameter value
expect(call(function(){ return this.a; }, context)).toBe(99);
