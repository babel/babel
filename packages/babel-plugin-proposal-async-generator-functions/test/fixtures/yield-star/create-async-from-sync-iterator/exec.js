async function* fn() {
  yield* [Promise.resolve("ok")] // CreateAsyncFromSyncIterator
}

return fn().next().then(result => {
  expect(result).toEqual({ value: "ok", done: false });
});
