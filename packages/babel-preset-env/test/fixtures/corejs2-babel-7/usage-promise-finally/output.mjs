import "core-js/modules/es6.object.to-string.js";
import "core-js/modules/es6.promise.js";
import "core-js/modules/es7.promise.finally.js";
var p = Promise.resolve(0);
p.finally(function () {
  alert("OK");
});
