var obj = {
  [key]: 1,
  __proto__: proto,
};

var stringKey = {
  [key]: 1,
  "__proto__": proto,
};

var nullProto = {
  [key]: 1,
  __proto__: null,
  other: 2,
};

var primitiveProto = {
  [key]: 1,
  __proto__: 5,
};
