/* @minVersion 7.0.0-beta.0 */

export default function _taggedTemplateLiteral(
  strings: readonly string[],
  raw?: readonly string[],
): TemplateStringsArray {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(
    Object.defineProperties<TemplateStringsArray>(strings as any, {
      raw: { value: Object.freeze(raw) },
    }),
  );
}
