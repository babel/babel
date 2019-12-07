import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.string.iterator";
import "core-js/modules/es6.promise";
import "core-js/modules/es6.object.to-string";
var p = Promise.resolve(0);
Promise.race([p]).then(function (outcome) {
  alert("OK");
});
