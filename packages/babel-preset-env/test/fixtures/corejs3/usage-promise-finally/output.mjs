import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.promise.finally.js";
var p = Promise.resolve(0);
p.finally(function () {
  alert("OK");
});
