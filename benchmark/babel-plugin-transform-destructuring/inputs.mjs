// Deterministic, destructuring-heavy inputs. Each generator repeats a set of
// templates so that the generated file exercises every supported form:
// object/array patterns, defaults, nested patterns, computed keys, rest
// elements, parameters, for-of heads, catch params and assignments.

function repeat(count, build) {
  let out = "";
  for (let i = 0; i < count; i++) out += build(i) + "\n";
  return out;
}

export const destructuring = repeat(
  150,
  i => `
function f${i}(data, { x${i}, y = ${i}, nested: { a, b: [c, d = 2, ...e] = [] } = {} }, [p, , q = p]) {
  const { id, name = "n${i}", tags: [first, ...others] = [] } = data;
  const [head, second = head, ...tail] = data.list;
  let { [key${i}]: computed, ["k" + ${i}]: computed2 } = data.map;
  var { deep: { deeper: { deepest } } } = data;
  for (const [k, { v, w = k }] of data.entries) {
    ({ a, b: { c } } = data[k]);
  }
  for (const { v: value } in data.index) {}
  try { throw data; } catch ({ message, code = 0 }) {}
  [x${i}, y] = [y, x${i}];
  return { id, name, first, others, head, second, tail, computed, computed2, deepest, value, message, code, x${i}, y, a, c, d, e, p, q };
}`
);

export const objectRestSpread = repeat(
  150,
  i => `
function g${i}(props, { a${i}, ...rest }) {
  const { className, style = {}, ...other } = props;
  const { [props.key]: dynamic, nested: { inner, ...innerRest }, ...outerRest } = props.data;
  const merged = { ...other, ...innerRest, id: ${i}, ...(props.extra || {}) };
  let base = { ...props.base };
  ({ a${i}, ...rest } = props.next);
  for (const { id, ...fields } of props.items) {
    base = { ...base, [id]: fields };
  }
  return { merged, base, className, style, dynamic, inner, outerRest, a${i}, rest };
}`
);

export const mixed = destructuring + objectRestSpread;

export const privateDestructuring = repeat(
  150,
  i => `
class C${i} {
  #x = ${i};
  #y = [1, 2, 3];
  static #z = { a: 1 };
  m(other) {
    const { #x: x, #y: [first, ...others] } = this;
    let { #x: ox = 0, plain, ...rest } = other;
    ({ #y: [, second] } = this);
    for (const { #x: px } of [this, other]) {}
    return [x, first, others, ox, plain, rest, second, px];
  }
  static s({ #z: { a } }) { return a; }
}`
);
