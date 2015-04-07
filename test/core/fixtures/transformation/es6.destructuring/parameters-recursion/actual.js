function resolve({a, b}, c) {
  c += 1;
  return resolve();
}
