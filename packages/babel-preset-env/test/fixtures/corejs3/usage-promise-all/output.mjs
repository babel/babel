import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
var p = Promise.resolve(0);
Promise.all([p]).then(function (outcome) {
  alert("OK");
});
