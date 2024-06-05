/* @minVersion 7.0.0-beta.0 */

export default function _taggedTemplateLiteralLoose(
  strings: readonly string[],
  raw?: readonly string[],
): TemplateStringsArray {
  if (!raw) {
    raw = strings.slice(0);
  }
  (strings as any).raw = raw;
  return strings as TemplateStringsArray;
}
