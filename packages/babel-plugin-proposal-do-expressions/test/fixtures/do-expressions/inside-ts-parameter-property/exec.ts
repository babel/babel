class C {
  constructor(readonly arg = do { effects.push(1); value }) {}
}

var value = { key: 1 }
var effects = [];
new C();
expect(effects).toEqual([1]);
