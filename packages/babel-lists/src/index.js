import globals from "globals";

const getBuiltinClasses = category =>
  Object.keys(globals[category]).filter(name => /^[A-Z]/.test(name));

export const builtinClasses = new Set([
  ...getBuiltinClasses("builtin"),
  ...getBuiltinClasses("browser"),
]);
