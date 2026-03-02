export default function gen() {
  return _gen.apply(this, arguments);
}
function _gen() {
  _gen = babelHelpers.skipFirstGeneratorNext(function* () {
    let _functionSent = yield;
    return _functionSent;
  });
  return _gen.apply(this, arguments);
}
