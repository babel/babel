try {
  throw 0;
} catch (e) {
  let e = new TypeError('Duplicate variable declaration; will throw an error.');
}
