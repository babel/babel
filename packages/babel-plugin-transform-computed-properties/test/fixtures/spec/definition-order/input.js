var a = {
  get ["x"]() { return 0; },
  ["y"]: 1,
};

var b = {
  get ["x"]() { return 0; },
  ["x"]: 1,
};

var x = { x, get x() { return 0; }, x };
x.x = 1;
