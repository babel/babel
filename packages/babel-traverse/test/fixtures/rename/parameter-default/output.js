let a = "outside";

function f(g = () => a) {
  let z = "inside";
  return g();
}

function h(z, g = () => z) {
  return g();
}

function j(g = a) {
  let z = "inside";
  return g;
}

function k([{
  g = a
}]) {
  let z = "inside";
  return g;
}

function l([{
  [a]: g
}]) {
  let z = "inside";
  return g;
}

function m(g = {
  [(({
    [a]: x
  }) => x)()]: "outside"
}) {
  let z = "inside";
  return g;
}

function n(g = (a = a) => {}) {
  let z = "inside";
}

function o(g = (a = a) => a) {
  let z = "inside";
}

function q(z, g = (b = z) => b) {
  g(z);
}

function r(z, g = (a, b = a) => a) {
  g(z);
}
