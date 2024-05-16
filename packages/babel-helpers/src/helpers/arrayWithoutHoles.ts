/* @minVersion 7.0.0-beta.0 */

import arrayLikeToArray from "./arrayLikeToArray.ts";

export default function _arrayWithoutHoles<T>(arr: any) {
  if (Array.isArray(arr)) return arrayLikeToArray<T>(arr);
}
