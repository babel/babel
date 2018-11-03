import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.string.iterator";
import "core-js/modules/es6.promise";
var p = Promise.resolve(0);
Promise.all([p]).then(function (outcome) {
  alert("OK");
});
