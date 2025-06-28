let rest1, rest2;
for (const [, {
  p: _,
  ...rest1_
}, ...rest2_] of [[0, {
  p: 1,
  q: 2,
  r: 3
}]]) {
  rest1 = rest1_;
  rest2 = rest2_;
  break;
}
;
