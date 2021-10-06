async function* fn() {
  for await (const result of [Promise.resolve("ok")]) {
    return { result };
  }
}
