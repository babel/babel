function getArgs() { return arguments; }

let args = getArgs(1, 2, 3);
let res = [];

// Simulate old environment
delete args[Symbol.iterator];
let _Symbol = Symbol;
Symbol = void 0;

try {
  for (let i of args) res.push(i);

  expect(res).toEqual([1, 2, 3]);
} finally {
  Symbol = _Symbol;
}

