let rest1, rest2, underscore;
for (const [, {
  p: _2,
  ...rest1_
}, ...rest2_] of [[0, {
  p: 1,
  q: 2,
  r: 3
}]]) {
  const _ = 0;
  rest1 = rest1_;
  rest2 = rest2_;
  underscore = _;
  break;
}
;
