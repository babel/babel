import 'core-js/stable';

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
