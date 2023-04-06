import {
  DEPRECATED_ALIASES,
  DEPRECATED_KEYS,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  PLACEHOLDERS,
  PLACEHOLDERS_FLIPPED_ALIAS,
  VISITOR_KEYS,
} from "../../lib/index.js";

function bool(value) {
  return value && value !== "false" && value !== "0";
}
const BABEL8 = bool(process.env.BABEL_8_BREAKING);

const has = Function.call.bind(Object.prototype.hasOwnProperty);

function buildCases(arr) {
  return arr.map(key => `case ${JSON.stringify(key)}:`).join("") + "break;";
}

function addIsHelper(type, aliasKeys, deprecated) {
  const targetType = JSON.stringify(type);
  let cases = "";
  if (aliasKeys) {
    cases = buildCases(aliasKeys);
  }

  const placeholderTypes = [];
  if (PLACEHOLDERS.includes(type) && has(FLIPPED_ALIAS_KEYS, type)) {
    placeholderTypes.push(type);
  }
  if (has(PLACEHOLDERS_FLIPPED_ALIAS, type)) {
    placeholderTypes.push(...PLACEHOLDERS_FLIPPED_ALIAS[type]);
  }
  if (placeholderTypes.length > 0) {
    cases += `
    case "Placeholder":
      switch (${BABEL8 ? "node" : "(node as t.Placeholder)"}.expectedNode) {
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

  return `export function is${type}(${
    BABEL8
      ? `node: t.Node | null | undefined, opts?: Opts<t.${type}> | null`
      : "node: object | null | undefined, opts?: object | null"
  }): ${result} {
    ${deprecated || ""}
    if (!node) return false;

    ${
      cases
        ? `
          switch(${BABEL8 ? "node" : "(node as t.Node)"}.type){
            ${cases}
            default:
              return false;
          }`
        : `if (${
            BABEL8 ? "node" : "(node as t.Node)"
          }.type !== ${targetType}) return false;`
    }

    return opts == null || shallowEqual(node, opts);
  }
  `;
}

export default function generateValidators() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import shallowEqual from "../../utils/shallowEqual";
import type * as t from "../..";
import deprecationWarning from "../../utils/deprecationWarning";
\n`;
  if (BABEL8) {
    output += `type Opts<Object> = Partial<{
  [Prop in keyof Object]: Object[Prop] extends t.Node
    ? t.Node | Object[Prop]
    : Object[Prop] extends t.Node[]
    ? t.Node[] | Object[Prop]
    : Object[Prop];
}>;
\n`;
  }

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
export function is${type}(${
      BABEL8
        ? `node: t.Node | null | undefined, opts?: Opts<t.${type}> | null`
        : "node: object | null | undefined, opts?: object | null"
    }): node is t.${newType} {
  deprecationWarning("is${type}", "is${newType}");
  return is${newType}(node, opts);
}
`;
  });

  return output;
}
