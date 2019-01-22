var inc = x => x + 1;

var double = x => x * 2;

const _pipe = 10;

const _pipe2 = inc(_pipe);

expect(double(_pipe2)).toBe(22);
