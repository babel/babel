let rest1, rest2;
try {
  throw [0, { p: 1, q: 2, r: 3 }];
} catch ([void, { p: void, ...rest1_ }, ...rest2_]) {
  rest1 = rest1_;
  rest2 = rest2_;
}

expect(rest1).toEqual({ q: 2, r: 3 });
expect(rest2).toEqual([]);
