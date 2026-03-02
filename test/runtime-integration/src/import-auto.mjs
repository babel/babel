import inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

console.log("================== import - auto ====================");
console.log("typeof inheritsLoose:", typeof inheritsLoose);

function A() {}
function B() {}
inheritsLoose(A, B);

console.log("A.__proto__ === B", A.__proto__ === B);
