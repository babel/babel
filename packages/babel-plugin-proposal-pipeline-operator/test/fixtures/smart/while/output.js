let i = 0;
let sum = 0;
const _pipe3 = i;

const _pipe4 = i = _pipe3 + 1;

let _test = _pipe4 <= 10;

while (_test) {
  sum = sum + i;
  const _pipe = i;

  const _pipe2 = i = _pipe + 1;

  _test = _pipe2 <= 10;
}

expect(sum).toBe(10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1);
