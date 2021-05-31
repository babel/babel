import 'core-js/stable';
import 'regenerator-runtime/runtime';

const foo = {
  a: true,
};

const bar = {
  ...foo,
  b: false,
};

async function baz() {
  for await (const x of someAsyncThing()) {
    console.log(x);
  }
}
