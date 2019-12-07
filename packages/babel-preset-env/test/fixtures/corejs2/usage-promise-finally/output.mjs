import "core-js/modules/es7.promise.finally";
import "core-js/modules/es6.promise";
import "core-js/modules/es6.object.to-string";
var p = Promise.resolve(0);
p.finally(function () {
  alert("OK");
});
