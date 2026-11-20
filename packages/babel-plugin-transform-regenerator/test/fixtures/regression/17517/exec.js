const logs = [];
const console = { log: (...args) => logs.push(args) };

const testA = async () => {
  return async () => {
    const { resData, config } = {}
    console.log('a', resData)
  }
}

const testB = async () => {
  await testA()
}

return testB()
  .then(result => {
    expect(result).toBeUndefined();
    expect(logs).toEqual([]);
    return testA();
  })
  .then(inner => inner())
  .then(() => {
    expect(logs).toEqual([["a", undefined]]);
  });
