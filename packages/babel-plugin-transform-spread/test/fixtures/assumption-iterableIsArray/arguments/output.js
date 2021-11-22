function foo() {
  var _sprd;

  // We know for sure that 'arguments' is _not_ an array, so we
  // can ignore the assumption in this case.
  return (_sprd = []).push.apply(_sprd, arguments), _sprd;
}
