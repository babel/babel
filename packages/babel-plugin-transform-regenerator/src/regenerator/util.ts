let currentTypes: any = null;

export function wrapWithTypes(types: any, fn: any) {
  return function (this: any, ...args: any[]) {
    const oldTypes = currentTypes;
    currentTypes = types;
    try {
      return fn.apply(this, args);
    } finally {
      currentTypes = oldTypes;
    }
  };
}

export function getTypes() {
  return currentTypes;
}

export function runtimeProperty(name: any) {
  const t = getTypes();
  return t.memberExpression(
    t.identifier("regeneratorRuntime"),
    t.identifier(name),
    false,
  );
}

export function isReference(path: any) {
  return (
    path.isReferenced() ||
    path.parentPath.isAssignmentExpression({ left: path.node })
  );
}

export function replaceWithOrRemove(path: any, replacement: any) {
  if (replacement) {
    path.replaceWith(replacement);
  } else {
    path.remove();
  }
}
