async function* fn() {
  yield* [Promise.resolve("ok")] // CreateAsyncFromSyncIterator
}
