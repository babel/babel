function f([{ ...r }, [a]]) {
  return [r, a];
}
function g([[{ ...r }], a] = x) {
  return [r, a];
}
function h(...[a, { ...r }]) {
  return [a, r];
}
