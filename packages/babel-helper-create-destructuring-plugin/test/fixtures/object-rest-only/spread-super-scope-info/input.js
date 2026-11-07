let i = 0, k = "x";
const proto = { x: 1 };
const a = { ...proto, m() { return super.x + i; } };
while (i < 2) f({ ...proto, m() { return super[k]; } });
outer: for (let j = 0; j < 2; j++) {
  const o = { ...proto, get [k]() { return super.x + j; } };
  for (const p of [o]) g({ ...p, m() { return super.x = p; } });
  continue outer;
}
do i++; while (i < 5 && f({ ...proto, __proto__: proto, m() { return super.x + i; } }));
for (const o = { ...proto, m() { return () => super.x; } }; i; i--) f(o);
const make = value => ({ ...{}, __proto__: { x: value }, m() { return super.x; } });
class A { field = { ...proto, m() { return super.x; } }; }
function h(o = { ...proto, m() { return super.x; } }) { return o; }
function* gen() {
  const o = { ...proto, __proto__: { x: yield 1 }, *m() { yield super.x; } };
  return o;
}
