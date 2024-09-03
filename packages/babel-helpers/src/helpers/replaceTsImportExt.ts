/* @minVersion 7.25.7 */

export default function replaceTsImportExt(source: string) {
  return /[\\/]/.test(source)
    ? source.replace(/(\.[mc]?)ts$/, "$1js").replace(/\.tsx$/, ".js")
    : source;
}
