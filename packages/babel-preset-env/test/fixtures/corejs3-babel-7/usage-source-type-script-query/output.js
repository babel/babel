require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("foo");
var x = new Promise(function (resolve) {
  var p = [];
  if (p.includes("a")) {}
});
