async function testA() {
  await Promise.resolve({ key: "value" });
  const {
    resData,
    other: { otherData: foo },
  } = config;
  for (const { x: { y } } of []) {
    y;
  }
  return resData;
}

async function testB() {
  await testA();
}
