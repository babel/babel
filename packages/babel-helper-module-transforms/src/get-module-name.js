// @flow

export default function getModuleName(
  rootOpts: Object,
  pluginOpts: Object,
): ?string {
  const {
    filename,
    filenameRelative = filename,

    sourceRoot = pluginOpts.moduleRoot ?? rootOpts.moduleRoot,
  } = rootOpts;

  const {
    moduleId = rootOpts.moduleId,
    moduleIds = rootOpts.moduleIds ?? !!moduleId,

    getModuleId = rootOpts.getModuleId,

    moduleRoot = rootOpts.moduleRoot ?? sourceRoot,
  } = pluginOpts;

  if (!moduleIds) return null;

  // moduleId is n/a if a `getModuleId()` is provided
  if (moduleId != null && !getModuleId) {
    return moduleId;
  }

  let moduleName = moduleRoot != null ? moduleRoot + "/" : "";

  if (filenameRelative) {
    const sourceRootReplacer =
      sourceRoot != null ? new RegExp("^" + sourceRoot + "/?") : "";

    moduleName += filenameRelative
      // remove sourceRoot from filename
      .replace(sourceRootReplacer, "")
      // remove extension
      .replace(/\.(\w*?)$/, "");
  }

  // normalize path separators
  moduleName = moduleName.replace(/\\/g, "/");

  if (getModuleId) {
    // If return is falsy, assume they want us to use our generated default name
    return getModuleId(moduleName) || moduleName;
  } else {
    return moduleName;
  }
}
