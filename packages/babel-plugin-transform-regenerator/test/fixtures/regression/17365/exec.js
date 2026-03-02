function* gen() {
  try {
    return;
  } finally {
     // noop
  }
}

expect(gen().next()).toEqual({
  done: true,
  value: undefined
});

async function foobar() {
  try {
    return;
  } finally {
     // noop
  }
}

return foobar().then(function (result) {
  expect(result).toBe(undefined);
});
