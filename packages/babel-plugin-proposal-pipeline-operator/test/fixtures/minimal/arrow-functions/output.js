const _pipe = [5, 10];

const _pipe2 = _pipe.map(x => x * 2);

const _pipe3 = _pipe2.reduce((a, b) => a + b);

var result = _pipe3 + 1;
expect(result).toBe(31);

var inc = x => x + 1;

var double = x => x * 2;

var result2 = [4, 9].map(x => {
  const _pipe4 = x;

  const _pipe5 = inc(_pipe4);

  return double(_pipe5);
});
expect(result2).toEqual([10, 20]);
