/* @minVersion 7.0.0-beta.0 */

export default function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(
    Object.defineProperties(strings, {
      raw: { value: Object.freeze(raw) },
    }),
  );
}
