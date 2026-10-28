function f({ b = a, a, ...r }) {
  return [b, a, r];
}
function g(...{ b = a, a, ...r }) {
  return [b, a, r];
}
function h({ ...s }, c = s, ...{ b = a, a, ...r }) {
  return [s, c, b, a, r];
}
