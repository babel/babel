export default function _callSkipFirstGeneratorNext(fn, self, args) {
  var it = fn.apply(self, args);
  it.next();
  return it;
}