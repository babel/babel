try {
  throw 0;
} catch (e) {
  e = new TypeError('A new variable is not being declared or initialized; the catch binding is being referenced and cannot be removed.');
}
