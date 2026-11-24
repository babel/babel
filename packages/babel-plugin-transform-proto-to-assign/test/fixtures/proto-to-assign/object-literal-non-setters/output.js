var method = {
  __proto__() {},
  a: 1
};
var accessors = {
  get __proto__() {},
  set __proto__(value) {}
};
var computed = {
  ["__proto__"]: bar
};
var shorthand = {
  __proto__
};
var string = babelHelpers.extends({}, bar);
