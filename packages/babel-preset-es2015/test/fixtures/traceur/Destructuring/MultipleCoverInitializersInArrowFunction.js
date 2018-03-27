// https://github.com/google/traceur-compiler/issues/838

var f = ({a = 0}, {b = 1}) => ({a, b});
expect(f({}, {})).toEqual({a: 0, b: 1});
