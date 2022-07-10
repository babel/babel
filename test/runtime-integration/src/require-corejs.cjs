const Set = require("@babel/runtime-corejs3/core-js/set.js");

console.log("=============== require - corejs ====================");
console.log("typeof Set:", typeof Set);

const arr = Array.from(new Set([1, 2, 3]));
console.log("arr:", arr.toString());
