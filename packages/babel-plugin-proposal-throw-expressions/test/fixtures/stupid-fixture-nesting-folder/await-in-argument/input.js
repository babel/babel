async function test() {
  (throw new Error(await 'test'));
}
