var _binary;
const binary = x => (y, z) => x(y, z);
const add1 = (_binary = binary((y, z) => y + z), function _binary2(_argPlaceholder) {
  return _binary(1, _argPlaceholder);
});
