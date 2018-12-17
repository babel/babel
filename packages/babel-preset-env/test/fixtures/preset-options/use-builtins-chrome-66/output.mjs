import "core-js/modules/es.symbol.description";
import "core-js/modules/web.immediate";
import "core-js/modules/web.queue-microtask";
import "core-js/modules/web.url.to-json";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";
import "core-js/modules/web.timers";
import "core-js/modules/web.url";
import "core-js/modules/web.url-search-params";
import "core-js/modules/web.url-search-params.sort";
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
