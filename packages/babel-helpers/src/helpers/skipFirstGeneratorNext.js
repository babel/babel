/* @minVersion 7.0.0-beta.0 */

export default function _skipFirstGeneratorNext(fn) {
  return function () {
    var it = fn.apply(this, arguments);
    it.next();
    return it;
  };
}
