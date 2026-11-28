let a = "outside";

function f(b = a, { c = a } = {}) {
  var a = "inside";
  return [a, b, c];
}

const g = (b = a) => {
  let a;
  return b;
};

const o = {
  m(b = a) {
    function a() {}
    return b;
  },
};

function h(a, b = a) {
  var a;
  return b;
}
