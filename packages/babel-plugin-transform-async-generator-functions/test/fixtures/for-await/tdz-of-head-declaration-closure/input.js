async function method() {
  for await (const x of [() => x]) {
    x();
  }
}
