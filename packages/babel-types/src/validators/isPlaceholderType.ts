// @flow
import { PLACEHOLDERS_ALIAS } from "../definitions";

/**
 * Test if a `placeholderType` is a `targetType` or if `targetType` is an alias of `placeholderType`.
 */
export default function isPlaceholderType(
  placeholderType: string,
  targetType: string,
): boolean {
  if (placeholderType === targetType) return true;

  const aliases: ?Array<string> = PLACEHOLDERS_ALIAS[placeholderType];
  if (aliases) {
    for (const alias of aliases) {
      if (targetType === alias) return true;
    }
  }

  return false;
}
