// https://github.com/google/traceur-compiler/issues/183

var f = ({x = 42}) => x;
expect(f({})).toBe(42);
