var _;
let rest1, rest2;
[, {
  p: _,
  ...rest1
}, ...rest2] = [0, {
  p: 1,
  q: 2,
  r: 3
}];
