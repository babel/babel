function f({ ...a }, b = a, ...[{ ...c }]) {}
function g({ ...a }, b = a, ...{ length, ...d }) {}
const h = ({ ...a }, b = a, ...rest) => this;
function i({ ...a }, b = a, ...rest) {
  return rest[0] + rest.length;
}
