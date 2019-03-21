import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
var p = Promise.resolve(0);
Promise.race([p]).then(function (outcome) {
  alert("OK");
});
