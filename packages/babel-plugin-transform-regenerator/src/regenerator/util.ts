import type { PluginPass } from "@babel/core";
import { types as t } from "@babel/core";

export let newHelpersAvailable: (file: PluginPass) => boolean;

export let runtimeProperty: (file: PluginPass, name: any) => any;

export function isReference(path: any) {
  return (
    path.isReferenced() ||
    path.parentPath.isAssignmentExpression({ left: path.node })
  );
}
