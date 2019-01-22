var a = 1,
    b = 2,
    c = 3;
const _pipe = a;

const _pipe2 = ((a, b) => b)(_pipe);

var result = ((a, b) => c)(_pipe2);

expect(result).toBe(c);
