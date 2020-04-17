"use strict";

require("foo");

console.log(function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}());
console.log(function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}().prop);

exports = function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}() + 1;

exports = function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}() + 4;

({
  exports
} = ({}, function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}()));
[exports] = ([], function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}());
exports = {};
(function () {
  throw new Error("The CommonJS '" + "exports" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
})().prop = "";
console.log(function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}());
console.log(function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}().exports);

module = function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}() + 1;

module = function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}() + 4;

({
  module
} = ({}, function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}()));
[module] = ([], function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
}());
module = {};
(function () {
  throw new Error("The CommonJS '" + "module" + "' variable is not available in ES6 modules." + "Consider setting setting sourceType:script or sourceType:unambiguous in your " + "Babel config for this file.");
})().prop = "";
