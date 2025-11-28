// @ts-expect-error: Could not find type declarations for babel-types
import * as _t from "../../lib/index.js";
import formatBuilderName from "../utils/formatBuilderName.ts";
import stringifyValidator from "../utils/stringifyValidator.ts";
import {
  areAllRemainingFieldsNullable,
  isNullable,
  hasDefault,
  sortFieldNames,
} from "../utils/fieldHelpers.ts";
import type { FieldOptions } from "../../src/definitions/utils.ts";

const {
  BUILDER_KEYS,
  DEPRECATED_KEYS,
  NODE_FIELDS,
  NODE_UNION_SHAPES__PRIVATE,
  toBindingIdentifierName,
} = _t as typeof import("@babel/types");

/**
 * Generate the builder arguments for a given node type.
 * @param type AST Node type
 * @param declare Whether to generate arguments for TS declaration functions
 */
function generateBuilderArgs(type: string, declare = false): string[] {
  const fields = NODE_FIELDS[type] as Record<string, FieldOptions>;
  const fieldNames = sortFieldNames(Object.keys(NODE_FIELDS[type]), type);
  const builderNames = BUILDER_KEYS[type];

  const args: string[] = [];

  fieldNames.forEach(fieldName => {
    const field: FieldOptions = fields[fieldName];
    let typeAnnotation = stringifyValidator(field.validate, "t.");

    if (isNullable(field) && !hasDefault(field)) {
      typeAnnotation += " | null";
    }

    if (builderNames.includes(fieldName)) {
      const field: FieldOptions = NODE_FIELDS[type][fieldName];
      const def = JSON.stringify(field.default);
      const bindingIdentifierName = toBindingIdentifierName(fieldName);
      let arg;
      if (areAllRemainingFieldsNullable(fieldName, builderNames, fields)) {
        arg = `${bindingIdentifierName}${
          isNullable(field) && (declare || !def) ? "?:" : ":"
        } ${typeAnnotation}`;
      } else {
        arg = `${bindingIdentifierName}: ${typeAnnotation}${
          isNullable(field) ? " | undefined" : ""
        }`;
      }
      if (!declare && (def !== "null" || isNullable(field))) {
        arg += `= ${def}`;
      }
      args.push(arg);
    }
  });

  return args;
}

function generateBuilderDeclareFunctions(
  type: string,
  formattedBuilderNameLocal: string
) {
  const fields = NODE_FIELDS[type] as Record<string, FieldOptions>;
  const fieldNames = sortFieldNames(Object.keys(NODE_FIELDS[type]), type);
  const builderNames = BUILDER_KEYS[type];
  const unionShape = NODE_UNION_SHAPES__PRIVATE[type];

  const shapes: string[] = [];

  unionShape.shapes.forEach(shape => {
    const args: string[] = [];
    const shapeValueTypes = shape.value.map(v => JSON.stringify(v)).join(" | ");

    fieldNames.forEach(fieldName => {
      const field = fields[fieldName];

      let typeAnnotation = stringifyValidator(field.validate, "t.");

      if (isNullable(field) && !hasDefault(field)) {
        typeAnnotation += " | null";
      }

      if (builderNames.includes(fieldName)) {
        const field = NODE_FIELDS[type][fieldName];
        const bindingIdentifierName = toBindingIdentifierName(fieldName);
        let arg;
        const unionProp = unionShape.shapes[0].properties[fieldName];
        if (unionShape.discriminator === fieldName) {
          typeAnnotation = shapeValueTypes;
        } else if (unionProp) {
          typeAnnotation = stringifyValidator(
            shape.properties[fieldName].validate,
            "t."
          );
        }
        if (areAllRemainingFieldsNullable(fieldName, builderNames, fields)) {
          arg = `${bindingIdentifierName}${
            isNullable(field) ? "?:" : ":"
          } ${typeAnnotation}`;
        } else {
          arg = `${bindingIdentifierName}: ${typeAnnotation}${
            isNullable(field) ? " | undefined" : ""
          }`;
        }
        args.push(arg);
      }
    });

    shapes.push(
      `function ${formattedBuilderNameLocal}(${args.join(", ")}) : Extract<t.${type}, { ${unionShape.discriminator}: ${shapeValueTypes} }>`
    );
  });

  shapes.push(
    `function ${formattedBuilderNameLocal}(${generateBuilderArgs(type, true).join(", ")}): t.${type}`
  );

  return shapes;
}

type BuilderKind = "lowercase.ts" | "uppercase.ts" | "index.ts";
/**
 * Generate the builder functions for a given builder kind.
 * @param kind
 */
export default function generateBuilders(kind: BuilderKind): string {
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
  const builderOverrideTypes = new Set<string>();

  const reservedNames = new Set(["super", "import"]);
  Object.keys(BUILDER_KEYS).forEach(type => {
    if (builderOverrideTypes.has(type)) {
      // Skip the BigIntLiteral builder override, which is handled above.
      return;
    }
    const unionShape = NODE_UNION_SHAPES__PRIVATE[type];
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

    if (unionShape) {
      output +=
        generateBuilderDeclareFunctions(type, formattedBuilderNameLocal)
          .map(
            v =>
              `${
                formattedBuilderNameLocal === formattedBuilderName
                  ? "export "
                  : ""
              }${v}`
          )
          .join("\n") + "\n";
    }

    output += `${
      formattedBuilderNameLocal === formattedBuilderName ? "export " : ""
    }function ${formattedBuilderNameLocal}(${defArgs.join(", ")}): t.${type} {`;

    const nodeObjectExpression = `{\n${objectFields
      .map(([k, v]) => (k === v ? `    ${k},` : `    ${k}: ${v},`))
      .join("\n")}\n  }`;

    if (builderNames.length > 0) {
      output += unionShape
        ? `\n  const node = ${nodeObjectExpression} as t.${type};`
        : `\n  const node: t.${type} = ${nodeObjectExpression};`;
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
  });

  return output;
}

function generateUppercaseBuilders() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */

  import * as b from "./lowercase.ts";
  import deprecationWarning from "../../utils/deprecationWarning.ts";

  function alias<const N extends keyof typeof b>(lowercase: N): typeof b[N] {
    return function () {
      deprecationWarning(
        lowercase.replace(/^(?:ts|jsx|[a-z])/, x => x.toUpperCase()),
        lowercase,
        "Usage of builders starting with an uppercase letter such as ",
        "uppercase builders",
      );
      return (b[lowercase] as any)(...arguments);
    } as any;
  }

  export const\n`;
  output += Object.keys(BUILDER_KEYS)
    .map(type => `  ${type} = alias("${formatBuilderName(type)}")`)
    .join(",\n");
  output += `;\n`;

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
