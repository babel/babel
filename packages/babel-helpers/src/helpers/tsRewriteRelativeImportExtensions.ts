/* @minVersion 7.27.0 */

// https://github.com/microsoft/TypeScript/blob/71716a2868c87248af5020e33a84a2178d41a2d6/src/compiler/factory/emitHelpers.ts#L1451
export default function tsRewriteRelativeImportExtensions(
  path: unknown,
  preserveJsx?: boolean,
) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
    return path.replace(
      /\.(tsx)$|((?:\.d)?)((?:\.[^./]+)?)\.([cm]?)ts$/i,
      function (m, tsx, d, ext, cm) {
        return tsx
          ? preserveJsx
            ? ".jsx"
            : ".js"
          : d && (!ext || !cm)
            ? m
            : d + ext + "." + cm.toLowerCase() + "js";
      },
    );
  }
  return path;
}
