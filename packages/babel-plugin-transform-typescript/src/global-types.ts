import type { NodePath, Scope } from "@babel/core";

export const GLOBAL_TYPES = new WeakMap<Scope, Set<string>>();

export function isGlobalType({ scope }: NodePath, name: string) {
  if (scope.hasBinding(name)) return false;
  if (GLOBAL_TYPES.get(scope).has(name)) return true;

  console.warn(
    `The exported identifier "${name}" is not declared in Babel's scope tracker\n` +
      `as a JavaScript value binding, and "@babel/plugin-transform-typescript"\n` +
      `never encountered it as a TypeScript type declaration.\n` +
      `It will be treated as a JavaScript value.\n\n` +
      `This problem is likely caused by another plugin injecting\n` +
      `"${name}" without registering it in the scope tracker. If you are the author\n` +
      ` of that plugin, please use "scope.registerDeclaration(declarationPath)".`,
  );

  return false;
}

export function registerGlobalType(programScope: Scope, name: string) {
  GLOBAL_TYPES.get(programScope).add(name);
}
