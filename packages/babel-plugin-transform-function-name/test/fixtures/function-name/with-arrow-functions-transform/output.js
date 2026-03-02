const _x = function x() {
  return _x;
};
const y = function y(x) {
  return x();
};
const z = {
  z: function z() {
    return y(_x);
  }
}.z;
