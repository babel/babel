import "core-js/modules/es6.promise";
import "core-js/modules/es6.object.to-string";
Promise.resolve().then(function (it) {
  setTimeout(foo, 1, 2);
  setInterval(foo, 1, 2);
  setImmediate(foo, 1, 2);
});
