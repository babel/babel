import t from "@babel/types";
import virtualTypes from "../../lib/path/lib/virtual-types.js";

export default function generateValidators() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import * as t from "@babel/types";
import NodePath from "../index";
import { VirtualTypeAliases } from "./virtual-types";

export interface NodePathValidators {
`;

  for (const type of [...t.TYPES].sort()) {
    output += `is${type}(opts?: object): this is NodePath<t.${type}>;`;
  }

  for (const type of Object.keys(virtualTypes)) {
    if (type[0] === "_") continue;
    output += `is${type}(opts?: object): this is NodePath<VirtualTypeAliases["${type}"]>;`;
  }

  output += `
}
`;

  return output;
}
