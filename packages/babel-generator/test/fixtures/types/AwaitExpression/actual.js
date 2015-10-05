async function foo() {
  await bar();
}

async function bar() {
  await* foo();
}
