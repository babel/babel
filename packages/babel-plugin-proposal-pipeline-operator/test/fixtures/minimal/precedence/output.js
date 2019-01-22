var inc = x => x + 1;

const _pipe = 4 || 9;

var result = inc(_pipe);
expect(result).toBe(5);

var f = x => x + 10;

var h = x => x + 20;

const _pipe2 = 10;

const _pipe3 = (f || h)(_pipe2);

var result2 = inc(_pipe3);
expect(result2).toBe(21);
