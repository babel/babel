require("core-js/modules/es6.object.to-string.js");
require("core-js/modules/es6.promise.js");
require("core-js/modules/es7.array.includes.js");
require("foo");
var x = new Promise(function (resolve) {
  var p = [];
  if (p.includes("a")) {}
});
