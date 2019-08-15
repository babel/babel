for (const {foo, ...bar} of {}) {
  () => foo;
  bar;
}
