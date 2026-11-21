let b;
try {} catch ({ a = b, ...r }) {
  let b = a;
  const c = () => b;
  function q() { return r; }
  try {} catch ({ d = b, ...s }) { let b = d + s; }
}
for (const { e = b, ...t } of z) {
  let b = e;
  f(t, b);
}
let e, t;
for ({ e, ...t } of z) f(e, t);
for (const { g = b, ...u } of z) label: for ({ e, ...t } of u) if (g) continue label;
