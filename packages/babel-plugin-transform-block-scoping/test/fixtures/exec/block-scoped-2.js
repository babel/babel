expect((() => {
  let sum = 0;
  let a = 0;
  {
    let a = 10;
    for (let i = 0; i < a; i++) {
      let a = 1;
      sum += (() => a)();
    }
  }
  return sum;
})()).toBe(10);
