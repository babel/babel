import {
  BUILDER_KEYS,
  DEPRECATED_KEYS,
  NODE_FIELDS,
  toBindingIdentifierName,
} from "../../lib/index.js";
import formatBuilderName from "../utils/formatBuilderName.js";
import stringifyValidator from "../utils/stringifyValidator.js";
// eslint-disable-next-line import/no-extraneous-dependencies
import { IS_BABEL_8 } from "$repo-utils";

if (!IS_BABEL_8()) {
  // eslint-disable-next-line no-var
  var lowerFirst = function (string) {
    return string[0].toLowerCase() + string.slice(1);
  };
}

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
    const indexA = BUILDER_KEYS[type].indexOf(fieldA);
    const indexB = BUILDER_KEYS[type].indexOf(fieldB);
    if (indexA === indexB) return fieldA < fieldB ? -1 : 1;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}

function generateBuilderArgs(type) {
  const fields = NODE_FIELDS[type];
  const fieldNames = sortFieldNames(Object.keys(NODE_FIELDS[type]), type);
  const builderNames = BUILDER_KEYS[type];

  const args = [];

  fieldNames.forEach(fieldName => {
    const field = fields[fieldName];
    // Future / annoying TODO:
    // MemberExpression.property, ObjectProperty.key and ObjectMethod.key need special cases; either:
    // - convert the declaration to chain() like ClassProperty.key and ClassMethod.key,
    // - declare an alias type for valid keys, detect the case and reuse it here,
    // - declare a disjoint union with, for example, ObjectPropertyBase,
    //   ObjectPropertyLiteralKey and ObjectPropertyComputedKey, and declare ObjectProperty
    //   as "ObjectPropertyBase & (ObjectPropertyLiteralKey | ObjectPropertyComputedKey)"
    let typeAnnotation = stringifyValidator(field.validate, "t.");

    if (isNullable(field) && !hasDefault(field)) {
      typeAnnotation += " | null";
    }

    if (builderNames.includes(fieldName)) {
      const field = NODE_FIELDS[type][fieldName];
      const def = JSON.stringify(field.default);
      const bindingIdentifierName = toBindingIdentifierName(fieldName);
      let arg;
      if (areAllRemainingFieldsNullable(fieldName, builderNames, fields)) {
        arg = `${bindingIdentifierName}${
          isNullable(field) && !def ? "?:" : ":"
        } ${typeAnnotation}`;
      } else {
        arg = `${bindingIdentifierName}: ${typeAnnotation}${
          isNullable(field) ? " | undefined" : ""
        }`;
      }
      if (def !== "null" || isNullable(field)) {
        arg += `= ${def}`;
      }
      args.push(arg);
    }
  });

  return args;
}

export default function generateBuilders(kind) {
  return kind === "lowercase.ts"
    ? generateLowercaseBuilders()
    : kind === "uppercase.ts"
      ? generateUppercaseBuilders()
      : generateBuildersAndAstTypesReexports();
}

function generateLowercaseBuilders() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import * as _validate from "../../validators/validate.ts";
import type * as t from "../../ast-types/generated/index.ts";
import deprecationWarning from "../../utils/deprecationWarning.ts";
import * as utils from "../../definitions/utils.ts";

const { validateInternal: validate } = _validate;
const { NODE_FIELDS } = utils;

`;

  const reservedNames = new Set(["super", "import"]);
  Object.keys(BUILDER_KEYS).forEach(type => {
    const defArgs = generateBuilderArgs(type);
    const formattedBuilderName = formatBuilderName(type);
    const formattedBuilderNameLocal = reservedNames.has(formattedBuilderName)
      ? `_${formattedBuilderName}`
      : formattedBuilderName;

    const fieldNames = sortFieldNames(Object.keys(NODE_FIELDS[type]), type);
    const builderNames = BUILDER_KEYS[type];
    const objectFields = [["type", JSON.stringify(type)]];
    fieldNames.forEach(fieldName => {
      const field = NODE_FIELDS[type][fieldName];
      if (builderNames.includes(fieldName)) {
        const bindingIdentifierName = toBindingIdentifierName(fieldName);
        objectFields.push([fieldName, bindingIdentifierName]);
      } else if (!field.optional) {
        const def = JSON.stringify(field.default);
        objectFields.push([fieldName, def]);
      }
    });

    output += `${
      formattedBuilderNameLocal === formattedBuilderName ? "export " : ""
    }function ${formattedBuilderNameLocal}(${defArgs.join(", ")}): t.${type} {`;

    const nodeObjectExpression = `{\n${objectFields
      .map(([k, v]) => (k === v ? `    ${k},` : `    ${k}: ${v},`))
      .join("\n")}\n  }`;

    if (builderNames.length > 0) {
      output += `\n  const node:t.${type} = ${nodeObjectExpression};`;
      output += `\n  const defs = NODE_FIELDS.${type};`;

      fieldNames.forEach(fieldName => {
        const field = NODE_FIELDS[type][fieldName];
        if (field && builderNames.includes(fieldName)) {
          const argName = toBindingIdentifierName(fieldName);
          output += `\n  validate(defs.${fieldName}, node, "${fieldName}", ${argName}${
            JSON.stringify(
              stringifyValidator(field.validate, "#node#")
            ).includes("#node#")
              ? ", 1"
              : ""
          });`;
        }
      });
      output += `\n  return node;`;
    } else {
      output += `\n  return ${nodeObjectExpression};`;
    }
    output += `\n}\n`;

    if (formattedBuilderNameLocal !== formattedBuilderName) {
      output += `export { ${formattedBuilderNameLocal} as ${formattedBuilderName} };\n`;
    }

    if (!IS_BABEL_8()) {
      // This is needed for backwards compatibility.
      // JSXIdentifier -> jSXIdentifier
      if (/^[A-Z]{2}/.test(type)) {
        output += `export { ${formattedBuilderNameLocal} as ${lowerFirst(
          type
        )} }\n`;
      }
    }
  });

  Object.keys(DEPRECATED_KEYS).forEach(type => {
    const newType = DEPRECATED_KEYS[type];
    const formattedBuilderName = formatBuilderName(type);
    const formattedNewBuilderName = formatBuilderName(newType);
    output += `/** @deprecated */
function ${type}(${generateBuilderArgs(newType).join(", ")}) {
  deprecationWarning("${type}", "${newType}", "The node type ");
  return ${formattedNewBuilderName}(${BUILDER_KEYS[newType].join(", ")});
}
export { ${type} as ${formattedBuilderName} };\n`;

    if (!IS_BABEL_8()) {
      // This is needed for backwards compatibility.
      // JSXIdentifier -> jSXIdentifier
      if (/^[A-Z]{2}/.test(type)) {
        output += `export { ${type} as ${lowerFirst(type)} }\n`;
      }
    }
  });

  return output;
}

function generateUppercaseBuilders() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */

  export {\n`;

  Object.keys(BUILDER_KEYS).forEach(type => {
    const formattedBuilderName = formatBuilderName(type);
    output += `  ${formattedBuilderName} as ${type},\n`;
  });

  Object.keys(DEPRECATED_KEYS).forEach(type => {
    const formattedBuilderName = formatBuilderName(type);
    output += `  ${formattedBuilderName} as ${type},\n`;
  });

  output += ` } from './lowercase.ts';\n`;
  return output;
}

function generateBuildersAndAstTypesReexports() {
  return `/*
    * This file is auto-generated! Do not modify it directly.
    * To re-generate run 'make build'
    */

    export * from "./lowercase.ts";
    export * from "./uppercase.ts";

    // Uppercase builders and AST types conflict with each other, which is
    // not allowed by TypeScript when using \`export * from ...\`
    // We instead explicity list the AST types here, so that:
    // - From a TypeScript perspective, the AST types win over the uppercase
    //   builders (which is the standard behavior for JS when a named
    //   re-export conflicts with a * re-export.)
    // - At runtime, this \`export type\` is removed, leaving only the uppercase
    //   builders behind (which are thus visible to JavaScript code).
    // This ensures compatibility with legacy code that uses the uppercase
    // builders, while allowing TypeScript users to use the lowercase builders
    // together with the AST types.

// prettier-ignore
export type {
  ${Object.keys(BUILDER_KEYS).join(", ")},
  ${Object.keys(DEPRECATED_KEYS).join(", ")}
} from "../../ast-types/generated/index.ts";

    // This will re-export all the type definitions that do not conflict with
    // uppercase builders, such as aliases.
    export type * from "../../ast-types/generated/index.ts";
  `;
}
