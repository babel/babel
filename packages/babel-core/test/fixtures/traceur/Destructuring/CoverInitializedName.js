// https://github.com/google/traceur-compiler/issues/183

var f = ({x = 42}) => x;
assert.equal(f({}), 42);
