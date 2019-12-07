require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("foo");

var x = new Promise(function (resolve) {
  var p = [];

  if (p.includes("a")) {}
});
