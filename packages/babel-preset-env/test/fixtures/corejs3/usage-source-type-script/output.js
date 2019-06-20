require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("foo");

var x = new Promise(function (resolve) {
  var p = [];

  if (p.includes("a")) {}
});
