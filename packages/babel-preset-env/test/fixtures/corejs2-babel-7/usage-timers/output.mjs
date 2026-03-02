import "core-js/modules/es6.object.to-string.js";
import "core-js/modules/es6.promise.js";
Promise.resolve().then(function (it) {
  setTimeout(foo, 1, 2);
  setInterval(foo, 1, 2);
  setImmediate(foo, 1, 2);
});
