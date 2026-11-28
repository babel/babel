function make(proto, obj = { __proto__: proto, m() { return super.x; }, ...{} }) {
  return obj;
}
expect([make({ x: 1 }).m(), make({ x: 2 }).m()]).toEqual([1, 2]);

const arrow = (proto, obj = { __proto__: proto, m() { return super.x; }, ...{} }) => obj;
expect([arrow({ x: 1 }).m(), arrow({ x: 2 }).m()]).toEqual([1, 2]);

function destructured(proto, { m, ...rest } = { __proto__: proto, m() { return super.x; }, ...{} }) {
  return m;
}
expect([destructured({ x: 1 })(), destructured({ x: 2 })()]).toEqual([1, 2]);

function rest(proto, ...[obj = { __proto__: proto, m() { return super.x; }, ...{} }]) {
  return obj;
}
expect([rest({ x: 1 }).m(), rest({ x: 2 }).m()]).toEqual([1, 2]);

function* generator(proto, obj = { __proto__: proto, m() { return super.x; }, ...{} }) {
  yield obj;
}
expect([generator({ x: 1 }).next().value.m(), generator({ x: 2 }).next().value.m()]).toEqual([1, 2]);
