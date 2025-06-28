let rest1, rest2;
for (const [void, { p: void, ...rest1_ }, ...rest2_] = [0, { p: 1, q: 2, r: 3 }]; true ; ) {
  rest1 = rest1_;
  rest2 = rest2_;
  break;
};
