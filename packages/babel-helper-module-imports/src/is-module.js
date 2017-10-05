/**
 * A small utility to check if a file qualifies as a module, based on a few
 * possible conditions.
 */
export default function isModule(
  path: NodePath,
  requireUnambiguous: boolean = false,
) {
  const { sourceType } = path.node;
  if (sourceType !== "module" && sourceType !== "script") {
    throw path.buildCodeFrameError(
      `Unknown sourceType "${sourceType}", cannot transform.`,
    );
  }

  const filename = path.hub.file.opts.filename;
  if (/\.mjs$/.test(filename)) {
    requireUnambiguous = false;
  }

  return (
    path.node.sourceType === "module" &&
    (!requireUnambiguous || isUnambiguousModule(path))
  );
}

// This approach is not ideal. It is here to preserve compatibility for now,
// but really this should just return true or be deleted.
function isUnambiguousModule(path) {
  return path.get("body").some(p => p.isModuleDeclaration());
}
