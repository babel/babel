let Promise;
async function foo() {
  await new Promise(resolve => { resolve() });
}
