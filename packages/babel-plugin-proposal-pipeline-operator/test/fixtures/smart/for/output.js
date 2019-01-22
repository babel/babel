let sum = 0;
var i = 0;
const _pipe2 = i;

let _test = _pipe2 <= 10;

for (; _test;) {
  sum = sum + i;
  ++i;
  const _pipe = i;
  _test = _pipe <= 10;
}

expect(sum).toBe(10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1);
