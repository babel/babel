import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/es.promise.finally";
var p = Promise.resolve(0);
p.finally(function () {
  alert("OK");
});
