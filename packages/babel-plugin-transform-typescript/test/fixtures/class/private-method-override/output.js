class Test {
  #f(x) {
    return typeof x === 'string' ? parseInt(x) : x.toString();
  }
}
