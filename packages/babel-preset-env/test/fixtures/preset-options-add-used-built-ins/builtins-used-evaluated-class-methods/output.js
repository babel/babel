import "core-js/modules/es6.object.assign";
var objectClass = Object;
var arrayInstance = [];
var assignStr = "assign";
var entriesStr = "entries";
var valuesStr = "values";
var inclidesStr = "includes";
var findStr = "find"; // Allow static methods be assigned to variables only directly in the module.

externalVar[valuesStr]; // don't include

objectClass[assignStr]({}); // include

arrayInstance[entriesStr]({}); // don't include
