let sum = 0;
var i = 0;

let _test = i <= 10;

for (; _test;) {
  sum = sum + i;
  const _pipe = i;
  i = _pipe + 1;
  _test = i <= 10;
}

expect(sum).toBe(10 + 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1);
