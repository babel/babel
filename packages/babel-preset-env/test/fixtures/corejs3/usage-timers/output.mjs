import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/web.immediate";
import "core-js/modules/web.timers";
Promise.resolve().then(function (it) {
  setTimeout(foo, 1, 2);
  setInterval(foo, 1, 2);
  setImmediate(foo, 1, 2);
});
