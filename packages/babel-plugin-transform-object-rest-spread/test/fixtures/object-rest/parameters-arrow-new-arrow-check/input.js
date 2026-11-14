function outer() {
  return ({ ...a }, b = g(), c = a) => this;
}
