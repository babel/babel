async function* fn() {
  for await (const result of [Promise.resolve("ok")]) {
    return { result };
  }
}

return fn().next().then(result => {
  expect(result).toEqual({
    done: true,
    value: { result: "ok" }
  });
});
