

async function* createAsyncGenerator() {
  try {
    yield 1;
  } finally {
    await Promise.resolve(2);
    await Promise.resolve(3);
    yield 4;
  }
  return 5;
}

async function test() {
  const withReturnCall = createAsyncGenerator();

  expect(await withReturnCall.next()).toEqual({ value: 1, done: false });
  expect(await withReturnCall.return(10)).toEqual({ value: 4, done: false });
  expect(await withReturnCall.next()).toEqual({ value: 10, done: true });
}

return test();
