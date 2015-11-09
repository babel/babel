var calls = 0;

var {} = Object(calls++);
assert.equal(calls, 1);

assert.throw(function() {
  var [] = Object(calls++);
}, TypeError);
assert.equal(calls, 2);

assert.throw(function() {
  var {} = Object(calls++), [] = Object(calls++);
});
assert.equal(calls, 4);


///////////////////////

calls = 0;

({} = Object(calls++));
assert.equal(calls, 1);

assert.throw(function() {
  [] = Object(calls++);
}, TypeError);
assert.equal(calls, 2);

assert.throw(function() {
  ({} = Object(calls++), [] = Object(calls++));
}, TypeError);
assert.equal(calls, 4);
