/**
 * Since we bundle @babel/core, we don't need @babel/helper-plugin-utils
 * to handle older versions.
 */

export function declare(x: any) {
  return x;
}
export { declare as declarePreset };
