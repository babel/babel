const test = () => {
  try {
    throw 0;
  }
  catch {
    return true;
  }
}

const test2 = () => {
  try {
    throw 0;
  }
  catch (err) {
    return true;
  }
}
assert(test2());
