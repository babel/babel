"use strict";

require("foo");

console.log(function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules.");
}());
console.log(function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules.");
}().prop);

exports = function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules.");
}() + 1;

exports = function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules.");
}() + 4;

({
  exports
} = ({}, function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules.");
}()));
[exports] = ([], function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules.");
}());
exports = {};
(function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules.");
})().prop = "";
console.log(function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules.");
}());
console.log(function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules.");
}().exports);

module = function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules.");
}() + 1;

module = function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules.");
}() + 4;

({
  module
} = ({}, function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules.");
}()));
[module] = ([], function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules.");
}());
module = {};
(function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules.");
})().prop = "";
