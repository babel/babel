function f([{ ...r }, b = r]) {
  return [r, b];
}
function g([{ ...r }, b = () => r]) {
  return [r, b()];
}
function h([{ ...r }, { ...s }, b = s]) {
  return [r, s, b];
}
