import "core-js/modules/web.timers";
import "core-js/modules/web.immediate";
import "core-js/modules/web.dom.iterable";
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
