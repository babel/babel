function replaceTsImportExt(e) {
  return /[\\/]/.test(e) ? e.replace(/(\.[mc]?)ts$/, "$1js").replace(/\.tsx$/, ".js") : e;
}
export { replaceTsImportExt as default };