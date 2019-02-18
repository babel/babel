import "core-js/modules/es.symbol.description";
import "core-js/modules/es.array.flat";
import "core-js/modules/es.array.flat-map";
import "core-js/modules/es.array.unscopables.flat";
import "core-js/modules/es.array.unscopables.flat-map";
import "core-js/modules/es.object.from-entries";
import "core-js/modules/es.promise";
import "core-js/modules/es.promise.finally";
import "core-js/modules/web.immediate";
import "core-js/modules/web.queue-microtask";
import "core-js/modules/web.url.to-json";
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
