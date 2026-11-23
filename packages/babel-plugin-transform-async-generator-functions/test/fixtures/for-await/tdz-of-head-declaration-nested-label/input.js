async function method() {
  init: {
    for await (const a of [() => a]) {
      break init;
    }
  }
}
