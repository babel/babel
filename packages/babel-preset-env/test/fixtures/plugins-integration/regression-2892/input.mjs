export default class Foo {
  async bar() {
    const baz = 0;
  }
}

async function foo() {
  async function bar() {
    const baz = {};
  }
}
