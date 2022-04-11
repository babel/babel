import "core-js/modules/es6.object.to-string.js";
import "core-js/modules/es6.promise.js";
import "core-js/modules/es6.string.iterator.js";
import "core-js/modules/es6.array.iterator.js";
import "core-js/modules/web.dom.iterable.js";
var p = Promise.resolve(0);
Promise.race([p]).then(function (outcome) {
  alert("OK");
});
