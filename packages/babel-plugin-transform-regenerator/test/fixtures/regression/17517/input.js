const testA = async () => {
  return async () => {
    const { resData, config } = {}
    console.log('a', resData)
  }
}

const testB = async () => {
  await testA()
}

console.log(testB)
