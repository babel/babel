let calls = 0;
const index = { valueOf() { return calls++; } };
function take(...args) {
  return args[+index];
}
expect([take(11, 22, 33), calls]).toEqual([11, 1]);
