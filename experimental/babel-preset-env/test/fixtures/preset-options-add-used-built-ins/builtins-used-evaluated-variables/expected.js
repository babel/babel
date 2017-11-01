import "@babel/polyfill/lib/core-js/modules/es6.object.assign";
import "@babel/polyfill/lib/core-js/modules/es6.array.find";
import "@babel/polyfill/lib/core-js/modules/es7.array.includes";
var arrayInstance = [];
var objectClass = Object;
var assignStr = "assign";
var valuesStr = "values";
var inclidesStr = "includes";
var findStr = "find"; // Allow instance methods be assigned to variables.

arrayInstance[inclidesStr](); // include

externalVar[findStr]; // include
// Allow static methods be assigned to variables only directly in the module.

externalVar[valuesStr]; // don't include

objectClass[assignStr]({}); // include
