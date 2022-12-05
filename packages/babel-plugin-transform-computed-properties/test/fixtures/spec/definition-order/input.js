var a = {
  get ["x"]() { return 0; },
  ["y"]: 1,
};

var b = {
  get ["x"]() { return 0; },
  ["x"]: 1,
};

var x = 1;
var y = { x, get x() { return 0; }, x };
y.x = 2;
