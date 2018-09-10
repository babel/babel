function required(msg) {
  throw new Error(msg);
}

function sum(
  { arr = required('arr is required') } = { arr: arr = [] },
  length = arr.length
) {
  let i = 0;
  let acc = 0;
  for (let item of arr) {
    if (i >= length) return acc;
    acc += item;
    i++;
  }
  return acc;
}

expect(sum({arr:[1,2]})).toBe(3);
