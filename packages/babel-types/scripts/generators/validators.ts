import {
  DEPRECATED_ALIASES,
  DEPRECATED_KEYS,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  PLACEHOLDERS,
  PLACEHOLDERS_FLIPPED_ALIAS,
  VISITOR_KEYS,
  // @ts-expect-error: Could not find type declarations for babel-types
} from "../../lib/index.js";

function buildCases(arr: string[]) {
  return arr.map(key => `case ${JSON.stringify(key)}:`).join("") + "break;";
}

function addIsHelper(
  type: string,
  aliasKeys?: string[],
  deprecatedWarning?: string
) {
  const targetType = JSON.stringify(type);
  let cases = "";
  if (aliasKeys) {
    cases = buildCases(aliasKeys);
  }

  const placeholderTypes = [];
  if (PLACEHOLDERS.includes(type) && Object.hasOwn(FLIPPED_ALIAS_KEYS, type)) {
    placeholderTypes.push(type);
  }
  if (Object.hasOwn(PLACEHOLDERS_FLIPPED_ALIAS, type)) {
    placeholderTypes.push(...PLACEHOLDERS_FLIPPED_ALIAS[type]);
  }
  if (placeholderTypes.length === 1) {
    cases += `
    case "Placeholder":
      if (node.expectedNode === ${JSON.stringify(placeholderTypes[0])})
      break;`;
  } else if (placeholderTypes.length) {
    cases += `
    case "Placeholder":
      switch (node.expectedNode) {
        ${buildCases(placeholderTypes)}
        default:
          return false;
      }
      break;`;
  }

  const result =
    NODE_FIELDS[type] || FLIPPED_ALIAS_KEYS[type]
      ? `node is t.${type}`
      : "boolean";

  const resultWithOpts =
    NODE_FIELDS[type] || FLIPPED_ALIAS_KEYS[type]
      ? `node is t.${type} & Opts`
      : "boolean";

  return [
    // Signature overload to avoid issues like https://github.com/babel/babel/pull/17503#discussion_r2325598609
    `export function is${type}(node: t.Node | null | undefined): ${result};`,
    `export function is${type}<Opts extends Options<t.${type}>>(node: t.Node | null | undefined, opts?: Opts | null): ${resultWithOpts};`,
    `export function is${type}<Opts extends Options<t.${type}>>(node: t.Node | null | undefined, opts?: Opts | null): ${resultWithOpts} {
    ${deprecatedWarning || ""}
    if (!node) return false;

    ${
      cases
        ? `
          switch(node.type){
            ${cases}
            default:
              return false;
          }`
        : `if (node.type !== ${targetType}) return false;`
    }

    return opts == null || shallowEqual(node, opts);
  }
  `,
  ].join("\n");
}

export default function generateValidators() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */

  /* eslint-disable no-fallthrough */

import shallowEqual from "../../utils/shallowEqual.ts";
import type * as t from "../../index.ts";
import deprecationWarning from "../../utils/deprecationWarning.ts";

type Options<Obj> = Partial<{
  [Prop in Exclude<keyof Obj, "type">]: Obj[Prop] extends t.Node
    ? t.Node
    : Obj[Prop] extends t.Node[]
    ? t.Node[]
    : Obj[Prop];
}>;

`;

  Object.keys(VISITOR_KEYS).forEach(type => {
    output += addIsHelper(type);
  });

  Object.keys(FLIPPED_ALIAS_KEYS)
    .filter(
      type => !Object.prototype.hasOwnProperty.call(DEPRECATED_ALIASES, type)
    )
    .forEach(type => {
      output += addIsHelper(type, FLIPPED_ALIAS_KEYS[type]);
    });

  Object.keys(DEPRECATED_KEYS).forEach(type => {
    const newType = DEPRECATED_KEYS[type];
    output += `/**
 * @deprecated Use \`is${newType}\`
 */
${addIsHelper(type, null, `deprecationWarning("is${type}", "is${newType}")`)}`;
  });

  Object.keys(DEPRECATED_ALIASES).forEach(type => {
    const newType = DEPRECATED_ALIASES[type];
    output += `/**
 * @deprecated Use \`is${newType}\`
 */
export function is${type}<Opts extends Options<t.${type}>>(node: t.Node | null | undefined, opts?: Opts | null): node is t.${newType} & Opts {
  deprecationWarning("is${type}", "is${newType}");
  return is${newType}(node, opts);
}
`;
  });

  return output;
}
