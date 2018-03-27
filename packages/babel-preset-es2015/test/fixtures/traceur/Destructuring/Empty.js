var calls = 0;

var {} = Object(calls++);
expect(calls).toBe(1);

expect(function() {
  var [] = Object(calls++);
}).toThrow(TypeError);
expect(calls).toBe(2);

expect(function() {
  var {} = Object(calls++), [] = Object(calls++);
}).toThrow();
expect(calls).toBe(4);


///////////////////////

calls = 0;

(((((((((((({} = Object(calls++)))))))))))));
expect(calls).toBe(1);

expect(function() {
  [] = Object(calls++);
}).toThrow(TypeError);
expect(calls).toBe(2);

expect(function() {
  (((((((((((({} = Object(calls++)))))))))))), [] = Object(calls++));
}).toThrow(TypeError);
expect(calls).toBe(4);
