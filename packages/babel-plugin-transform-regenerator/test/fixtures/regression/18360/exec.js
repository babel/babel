async function f() {
  return `value: ${await Promise.resolve(1)}`;
}

const taggedCalls = [];

function tag(strings, ...values) {
  taggedCalls.push([[...strings], [...strings.raw], values]);
  return "tagged:" + values[0];
}

async function tagged() {
  return tag`tag ${await Promise.resolve("x")} end`;
}

return Promise.all([f(), tagged()]).then(([value, taggedValue]) => {
  expect(value).toBe("value: 1");
  expect(taggedValue).toBe("tagged:x");
  expect(taggedCalls).toEqual([[["tag ", " end"], ["tag ", " end"], ["x"]]]);
});
