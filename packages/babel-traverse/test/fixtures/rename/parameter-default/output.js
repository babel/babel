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

function n(g = (z = a) => {}) {
  let z = "inside";
}

function o(g = z => z) {
  let z = "inside";
}
