function f([{ ...r }, { b }], c) {
  return [r, b, c];
}
function g([{ ...r }, { b } = { b: 3 }]) {
  return [r, b];
}
function h([{ ...r }, [{ b }]]) {
  return [r, b];
}
function i([{ ...r }, [{ ...s }]]) {
  return [r, s];
}
const j = ([{ ...r }, { b }]) => [r, b];
