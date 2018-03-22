var calls = 0;

var {} = Object(calls++);
expect(calls).toBe(1);

assert.throw(function() {
  var [] = Object(calls++);
}, TypeError);
expect(calls).toBe(2);

assert.throw(function() {
  var {} = Object(calls++), [] = Object(calls++);
});
expect(calls).toBe(4);


///////////////////////

calls = 0;

(((((((((((({} = Object(calls++)))))))))))));
expect(calls).toBe(1);

assert.throw(function() {
  [] = Object(calls++);
}, TypeError);
expect(calls).toBe(2);

assert.throw(function() {
  (((((((((((({} = Object(calls++)))))))))))), [] = Object(calls++));
}, TypeError);
expect(calls).toBe(4);
