try {
  throw 0;
} catch (e) {
  let e = new TypeError('New variable declaration, initialization, and assignment; the catch binding is not being referenced and can be removed.');
}
