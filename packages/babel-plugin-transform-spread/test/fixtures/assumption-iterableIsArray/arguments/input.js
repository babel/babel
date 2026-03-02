function foo() {
  // We know for sure that 'arguments' is _not_ an array, so we
  // can ignore the assumption in this case.
  return [...arguments];
}
