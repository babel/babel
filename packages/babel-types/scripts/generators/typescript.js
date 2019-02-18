"use strict";

const t = require("../../");
const stringifyValidator = require("../utils/stringifyValidator");
const toFunctionName = require("../utils/toFunctionName");

let code = `// NOTE: This file is autogenerated. Do not modify.
// See packages/babel-types/scripts/generators/typescript.js for script used.

interface BaseComment {
  value: string;
  start: number;
  end: number;
  loc: SourceLocation;
  type: "CommentBlock" | "CommentLine";
}

export interface CommentBlock extends BaseComment {
  type: "CommentBlock";
}

export interface CommentLine extends BaseComment {
  type: "CommentLine";
}

export type Comment = CommentBlock | CommentLine;

export interface SourceLocation {
  start: {
    line: number;
    column: number;
  };

  end: {
    line: number;
    column: number;
  };
}

interface BaseNode {
  leadingComments: ReadonlyArray<Comment> | null;
  innerComments: ReadonlyArray<Comment> | null;
  trailingComments: ReadonlyArray<Comment> | null;
  start: number | null;
  end: number | null;
  loc: SourceLocation | null;
  type: Node["type"];
}

export type Node = ${t.TYPES.sort().join(" | ")};\n\n`;

//

const lines = [];

for (const type in t.NODE_FIELDS) {
  const fields = t.NODE_FIELDS[type];
  const fieldNames = sortFieldNames(Object.keys(t.NODE_FIELDS[type]), type);

  const struct = ['type: "' + type + '";'];
  const args = [];

  fieldNames.forEach(fieldName => {
    const field = fields[fieldName];
    let typeAnnotation = stringifyValidator(field.validate, "");

    if (isNullable(field) && !hasDefault(field)) {
      typeAnnotation += " | null";
    }

    if (areAllRemainingFieldsNullable(fieldName, fieldNames, fields)) {
      args.push(
        `${t.toBindingIdentifierName(fieldName)}${
          isNullable(field) ? "?:" : ":"
        } ${typeAnnotation}`
      );
    } else {
      args.push(
        `${t.toBindingIdentifierName(fieldName)}: ${typeAnnotation}${
          isNullable(field) ? " | undefined" : ""
        }`
      );
    }

    const alphaNumeric = /^\w+$/;

    if (t.isValidIdentifier(fieldName) || alphaNumeric.test(fieldName)) {
      struct.push(`${fieldName}: ${typeAnnotation};`);
    } else {
      struct.push(`"${fieldName}": ${typeAnnotation};`);
    }
  });

  code += `export interface ${type} extends BaseNode {
  ${struct.join("\n  ").trim()}
}\n\n`;

  // super and import are reserved words in JavaScript
  if (type !== "Super" && type !== "Import") {
    lines.push(
      `export function ${toFunctionName(type)}(${args.join(", ")}): ${type};`
    );
  }
}

for (let i = 0; i < t.TYPES.length; i++) {
  let decl = `export function is${
    t.TYPES[i]
  }(node: any, opts?: object | null): `;

  if (t.NODE_FIELDS[t.TYPES[i]]) {
    decl += `node is ${t.TYPES[i]};`;
  } else if (t.FLIPPED_ALIAS_KEYS[t.TYPES[i]]) {
    decl += `node is ${t.TYPES[i]};`;
  } else {
    decl += `boolean;`;
  }

  lines.push(decl);
}

lines.push(
  `export function validate(n: Node, key: string, value: any): void;`,
  `export function clone<T extends Node>(n: T): T;`,
  `export function cloneDeep<T extends Node>(n: T): T;`,
  `export function removeProperties(
  n: Node,
  opts?: { preserveComments: boolean } | null
): void;`,
  `export function removePropertiesDeep<T extends Node>(
  n: T,
  opts?: { preserveComments: boolean } | null
): T;`,
  `export type TraversalAncestors = ReadonlyArray<{
    node: Node,
    key: string,
    index?: number,
  }>;
  export type TraversalHandler<T> = (node: Node, parent: TraversalAncestors, type: T) => void;
  export type TraversalHandlers<T> = {
    enter?: TraversalHandler<T>,
    exit?: TraversalHandler<T>,
  };`.replace(/(^|\n) {2}/g, "$1"),
  // eslint-disable-next-line
  `export function traverse<T>(n: Node, h: TraversalHandler<T> | TraversalHandlers<T>, state?: T): void;`
);

for (const type in t.DEPRECATED_KEYS) {
  code += `/**
 * @deprecated Use \`${t.DEPRECATED_KEYS[type]}\`
 */
export type ${type} = ${t.DEPRECATED_KEYS[type]};\n
`;
}

for (const type in t.FLIPPED_ALIAS_KEYS) {
  const types = t.FLIPPED_ALIAS_KEYS[type];
  code += `export type ${type} = ${types
    .map(type => `${type}`)
    .join(" | ")};\n`;
}
code += "\n";

code += "export interface Aliases {\n";
for (const type in t.FLIPPED_ALIAS_KEYS) {
  code += `  ${type}: ${type};\n`;
}
code += "}\n\n";

code += lines.join("\n") + "\n";

//

process.stdout.write(code);

//

function areAllRemainingFieldsNullable(fieldName, fieldNames, fields) {
  const index = fieldNames.indexOf(fieldName);
  return fieldNames.slice(index).every(_ => isNullable(fields[_]));
}

function hasDefault(field) {
  return field.default != null;
}

function isNullable(field) {
  return field.optional || hasDefault(field);
}

function sortFieldNames(fields, type) {
  return fields.sort((fieldA, fieldB) => {
    const indexA = t.BUILDER_KEYS[type].indexOf(fieldA);
    const indexB = t.BUILDER_KEYS[type].indexOf(fieldB);
    if (indexA === indexB) return fieldA < fieldB ? -1 : 1;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}
