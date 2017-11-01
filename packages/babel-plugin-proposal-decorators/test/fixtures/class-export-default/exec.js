const calls = [];

function foo(target) {
  calls.push(target.name);
}

@foo
export default class Foo {
  bar() {
    class Baz {}
  }
}

assert.deepEqual(calls, ["Foo"]);
