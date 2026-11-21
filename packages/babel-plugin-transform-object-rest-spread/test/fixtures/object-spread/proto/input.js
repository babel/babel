var obj = {
  ...spread,
  __proto__: proto,
};

var mixed = {
  ...spread,
  a: 1,
  __proto__: proto,
  b: 2,
};

var nullProto = {
  ...spread,
  __proto__: null,
};

var protoFirst = {
  __proto__: proto,
  ...spread,
};
