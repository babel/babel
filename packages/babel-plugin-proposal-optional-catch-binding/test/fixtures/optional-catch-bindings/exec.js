const test = () => {
  try {
    throw 0;
  }
  catch {
    return true;
  }
}
expect(test()).toBe(true);

const test2 = () => {
  try {
    throw 0;
  }
  catch (err) {
    return true;
  }
}
expect(test2()).toBe(true);
