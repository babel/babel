import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.flat.js";
import "core-js/modules/es.array.flat-map.js";
import "core-js/modules/es.array.reduce.js";
import "core-js/modules/es.array.reduce-right.js";
import "core-js/modules/es.array.sort.js";
import "core-js/modules/es.array.unscopables.flat.js";
import "core-js/modules/es.array.unscopables.flat-map.js";
import "core-js/modules/es.math.hypot.js";
import "core-js/modules/es.object.from-entries.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.promise.finally.js";
import "core-js/modules/es.typed-array.sort.js";
import "core-js/modules/web.immediate.js";
import "core-js/modules/web.queue-microtask.js";
import "core-js/modules/web.url.js";
import "core-js/modules/web.url.to-json.js";
import "core-js/modules/web.url-search-params.js";
const foo = {
  a: true
};
const bar = { ...foo,
  b: false
};

async function baz() {
  for await (const x of someAsyncThing()) {
    console.log(x);
  }
}
