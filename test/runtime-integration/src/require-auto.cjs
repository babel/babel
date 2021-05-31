const objectWithoutProperties = require("@babel/runtime/helpers/objectWithoutProperties");

console.log("================= require - auto ====================");
console.log("typeof objectWithoutProperties:", typeof objectWithoutProperties);
console.log(
  "typeof objectWithoutProperties.default:",
  typeof objectWithoutProperties.default
);

const obj = objectWithoutProperties(
  { a: 1, b: 2, c: 3, [Symbol.iterator]: 4, [Symbol.toStringTag]: 5 },
  ["a", "c", Symbol.iterator]
);
console.log("obj:", obj);
