/* @minVersion 7.0.0-beta.0 */

export default function _taggedTemplateLiteralLoose(
  strings: readonly string[],
  raw?: readonly string[],
): TemplateStringsArray {
  if (!raw) {
    raw = strings.slice(0);
  }
  // Loose: TemplateStringsArray['raw'] is readonly, so we have to cast it to any before assigning
  (strings as any).raw = raw;
  return strings as TemplateStringsArray;
}
