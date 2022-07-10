import Set from "@babel/runtime-corejs3/core-js/set.js";

console.log("=============== import - corejs ====================");
console.log("typeof Set:", typeof Set);

const arr = Array.from(new Set([1, 2, 3]));
console.log("arr:", arr.toString());
