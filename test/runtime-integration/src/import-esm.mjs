import toArray from "@babel/runtime/helpers/esm/toArray";

console.log("================= import - esm ======================");
console.log("typeof toArray:", typeof toArray);

const arr = toArray(new Set([1, 2, 3]));

console.log("arr:", arr.toString());
