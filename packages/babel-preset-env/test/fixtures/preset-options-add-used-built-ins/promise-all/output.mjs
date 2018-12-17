import "core-js/modules/web.dom-collections.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.promise";
import "core-js/modules/es.promise.finally";
import "core-js/modules/es.object.to-string";
var p = Promise.resolve(0);
Promise.all([p]).then(function (outcome) {
  alert("OK");
});
