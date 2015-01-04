function call(fn, context=this) {
  return fn.call(context);
}

var context = {a: 99};

// use the default parameter
assert.strictEqual(call.call(context, function(){ return this.a; }), 99);

// explicitly provide the default parameter value
assert.strictEqual(call(function(){ return this.a; }, context), 99);
