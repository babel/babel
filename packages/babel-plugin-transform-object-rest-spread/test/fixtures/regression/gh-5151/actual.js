const { x, ...y } = a,
  z = foo(y);

const { ...s } = r,
  t = foo(s);

// ordering is preserved
var l = foo(),
    { m: { n, ...o }, ...p } = bar(),
    q = baz();
