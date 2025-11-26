async function testA() {
  await Promise.resolve({ key: "value" });
  const {
    resData,
    other: { otherData: foo },
  } = config;
  return resData;
}

async function testB() {
  await testA();
}
