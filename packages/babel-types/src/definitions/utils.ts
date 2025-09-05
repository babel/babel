import is from "../validators/is.ts";
import { validateField, validateChild } from "../validators/validate.ts";
import type * as t from "../index.ts";

export const VISITOR_KEYS: Record<string, string[]> = {};
export const ALIAS_KEYS: Partial<Record<NodeTypesWithoutComment, string[]>> =
  {};
export const FLIPPED_ALIAS_KEYS: Record<string, NodeTypesWithoutComment[]> = {};
export const NODE_FIELDS: Record<string, FieldDefinitions<t.Node>> = {};
export const BUILDER_KEYS: Record<string, string[]> = {};
export const DEPRECATED_KEYS: Record<string, NodeTypesWithoutComment> = {};
export const NODE_PARENT_VALIDATIONS: Record<string, Validator<t.Node>> = {};

function getType(val: any) {
  if (Array.isArray(val)) {
    return "array";
  } else if (val === null) {
    return "null";
  } else {
    return typeof val;
  }
}

type NodeTypesWithoutComment = t.Node["type"] | keyof t.Aliases;

type NodeTypes = NodeTypesWithoutComment | t.Comment["type"];

type PrimitiveTypes = ReturnType<typeof getType>;

type FieldDefinitions<T extends t.Node> = {
  [x: string]: FieldOptions<T>;
};

type DefineTypeOpts<T extends t.Node> = {
  fields?: FieldDefinitions<T>;
  visitor?: Array<string>;
  aliases?: Array<string>;
  builder?: Array<string>;
  inherits?: NodeTypes;
  deprecatedAlias?: string;
  validate?: Validator<T>;
};

export type Validator<T extends t.Node> = (
  | { type: PrimitiveTypes }
  | { each: Validator<T> }
  | { chainOf: Validator<T>[] }
  | { oneOf: any[] }
  | { oneOfNodeTypes: NodeTypes[] }
  | { oneOfNodeOrValueTypes: (NodeTypes | PrimitiveTypes)[] }
  | { shapeOf: { [x: string]: FieldOptions<T> } }
  | object
) &
  ((node: T, key: string | { toString(): string }, val: any) => void);

export type FieldOptions<T extends t.Node> = {
  default?: string | number | boolean | [];
  optional?: boolean;
  deprecated?: boolean;
  validate?: Validator<T>;
};

export function validate<T extends t.Node>(
  validate: Validator<T>,
): FieldOptions<T> {
  return { validate };
}

export function validateType(...typeNames: NodeTypes[]) {
  return validate(assertNodeType(...typeNames));
}

export function validateOptional<T extends t.Node>(
  validate: Validator<T>,
): FieldOptions<T> {
  return { validate, optional: true };
}

export function validateOptionalType<T extends t.Node>(
  ...typeNames: NodeTypes[]
): FieldOptions<T> {
  return { validate: assertNodeType(...typeNames), optional: true };
}

export function arrayOf<T extends t.Node>(
  elementType: Validator<T>,
): Validator<T> {
  return chain(assertValueType("array"), assertEach(elementType));
}

export function arrayOfType(...typeNames: NodeTypes[]) {
  return arrayOf(assertNodeType(...typeNames));
}

export function validateArrayOfType(...typeNames: NodeTypes[]) {
  return validate(arrayOfType(...typeNames));
}

export function assertEach<T extends t.Node>(
  callback: Validator<T>,
): Validator<T> {
  const childValidator =
    process.env.BABEL_8_BREAKING || process.env.BABEL_TYPES_8_BREAKING
      ? validateChild
      : () => {};

  function validator(node: T, key: string | { toString(): string }, val: any) {
    if (!Array.isArray(val)) return;

    let i = 0;
    // We lazily concatenate strings here for performance reasons.
    // Concatenating the strings is expensive because we are actually concatenating a string and a number,
    // so V8 cannot just create a "rope string" but has to allocate memory for the string resulting from the number
    // This string is very rarely used, only in error paths, so we can skip the concatenation cost in most cases
    const subKey = {
      toString() {
        return `${key}[${i}]`;
      },
    };

    for (; i < val.length; i++) {
      const v = val[i];
      callback(node, subKey, v);
      childValidator(node, subKey, v);
    }
  }
  validator.each = callback;
  return validator;
}

export function assertOneOf<T extends t.Node>(
  ...values: Array<any>
): Validator<T> {
  function validate(node: any, key: string | { toString(): string }, val: any) {
    if (!values.includes(val)) {
      throw new TypeError(
        `Property ${key} expected value to be one of ${JSON.stringify(
          values,
        )} but got ${JSON.stringify(val)}`,
      );
    }
  }

  validate.oneOf = values;

  return validate;
}

export const allExpandedTypes: {
  types: NodeTypes[];
  set: Set<string>;
}[] = [];

export function assertNodeType<T extends t.Node>(
  ...types: NodeTypes[]
): Validator<T> {
  const expandedTypes = new Set<string>();

  allExpandedTypes.push({ types, set: expandedTypes });

  function validate(node: T, key: string | { toString(): string }, val: any) {
    const valType = val?.type;
    if (valType != null) {
      if (expandedTypes.has(valType)) {
        validateChild(node, key, val);
        return;
      }
      if (valType === "Placeholder") {
        for (const type of types) {
          if (is(type, val)) {
            validateChild(node, key, val);
            return;
          }
        }
      }
    }

    throw new TypeError(
      `Property ${key} of ${
        node.type
      } expected node to be of a type ${JSON.stringify(
        types,
      )} but instead got ${JSON.stringify(valType)}`,
    );
  }

  validate.oneOfNodeTypes = types;

  return validate;
}

export function assertNodeOrValueType<T extends t.Node>(
  ...types: (NodeTypes | PrimitiveTypes)[]
): Validator<T> {
  function validate(node: T, key: string | { toString(): string }, val: any) {
    const primitiveType = getType(val);
    for (const type of types) {
      if (primitiveType === type || is(type, val)) {
        validateChild(node, key, val);
        return;
      }
    }

    throw new TypeError(
      `Property ${key} of ${
        node.type
      } expected node to be of a type ${JSON.stringify(
        types,
      )} but instead got ${JSON.stringify(val?.type)}`,
    );
  }

  validate.oneOfNodeOrValueTypes = types;

  return validate;
}

export function assertValueType<T extends t.Node>(
  type: PrimitiveTypes,
): Validator<T> {
  function validate(node: T, key: string | { toString(): string }, val: any) {
    if (getType(val) === type) {
      return;
    }

    throw new TypeError(
      `Property ${key} expected type of ${type} but got ${getType(val)}`,
    );
  }

  validate.type = type;

  return validate;
}

export function assertShape<T extends t.Node>(shape: {
  [x: string]: FieldOptions<T>;
}): Validator<T> {
  const keys = Object.keys(shape);
  function validate(node: T, key: string | { toString(): string }, val: any) {
    const errors = [];
    for (const property of keys) {
      try {
        validateField(node, property, val[property], shape[property]);
      } catch (error) {
        if (error instanceof TypeError) {
          errors.push(error.message);
          continue;
        }
        throw error;
      }
    }
    if (errors.length) {
      throw new TypeError(
        `Property ${key} of ${
          node.type
        } expected to have the following:\n${errors.join("\n")}`,
      );
    }
  }

  validate.shapeOf = shape;

  return validate;
}

export function assertOptionalChainStart<T extends t.Node>(): Validator<T> {
  function validate(node: T) {
    let current: t.Node = node;
    while (node) {
      const { type } = current;
      if (type === "OptionalCallExpression") {
        if (current.optional) return;
        current = current.callee;
        continue;
      }

      if (type === "OptionalMemberExpression") {
        if (current.optional) return;
        current = current.object;
        continue;
      }

      break;
    }

    throw new TypeError(
      `Non-optional ${node.type} must chain from an optional OptionalMemberExpression or OptionalCallExpression. Found chain from ${current?.type}`,
    );
  }

  return validate;
}

export function chain<T extends t.Node>(
  ...fns: Array<Validator<T>>
): Validator<T> {
  function validate(...args: Parameters<Validator<T>>) {
    for (const fn of fns) {
      fn(...args);
    }
  }
  validate.chainOf = fns;

  if (
    fns.length >= 2 &&
    "type" in fns[0] &&
    fns[0].type === "array" &&
    !("each" in fns[1])
  ) {
    throw new Error(
      `An assertValueType("array") validator can only be followed by an assertEach(...) validator.`,
    );
  }

  return validate;
}

const validTypeOpts = new Set([
  "aliases",
  "builder",
  "deprecatedAlias",
  "fields",
  "inherits",
  "visitor",
  "validate",
]);
const validFieldKeys = new Set([
  "default",
  "optional",
  "deprecated",
  "validate",
]);

const store = {} as Record<string, DefineTypeOpts<t.Node>>;

// Wraps defineType to ensure these aliases are included.
export function defineAliasedType(...aliases: string[]) {
  return <T extends NodeTypesWithoutComment>(
    type: T,
    opts: DefineTypeOpts<
      Extract<
        t.Node,
        {
          type: T;
        }
      >
    > = {},
  ) => {
    let defined = opts.aliases;
    if (!defined) {
      if (opts.inherits) defined = store[opts.inherits].aliases?.slice();
      defined ??= [];
      opts.aliases = defined;
    }
    const additional = aliases.filter(a => !defined.includes(a));
    defined.unshift(...additional);
    defineType(type, opts);
  };
}

export default function defineType<T extends NodeTypesWithoutComment>(
  type: T,
  opts: DefineTypeOpts<Extract<t.Node, { type: T }>> = {},
) {
  const inherits = (opts.inherits && store[opts.inherits]) || {};

  let fields = opts.fields;
  if (!fields) {
    fields = {};
    if (inherits.fields) {
      const keys = Object.getOwnPropertyNames(inherits.fields);
      for (const key of keys) {
        const field = inherits.fields[key];
        const def = field.default;
        if (
          Array.isArray(def) ? def.length > 0 : def && typeof def === "object"
        ) {
          throw new Error(
            "field defaults can only be primitives or empty arrays currently",
          );
        }
        fields[key] = {
          default: Array.isArray(def) ? [] : def,
          optional: field.optional,
          deprecated: field.deprecated,
          validate: field.validate,
        };
      }
    }
  }

  const visitor: Array<string> = opts.visitor || inherits.visitor || [];
  const aliases: Array<string> = opts.aliases || inherits.aliases || [];
  const builder: Array<string> =
    opts.builder || inherits.builder || opts.visitor || [];

  for (const k of Object.keys(opts)) {
    if (!validTypeOpts.has(k)) {
      throw new Error(`Unknown type option "${k}" on ${type}`);
    }
  }

  if (opts.deprecatedAlias) {
    DEPRECATED_KEYS[opts.deprecatedAlias] = type;
  }

  // ensure all field keys are represented in `fields`
  for (const key of visitor.concat(builder)) {
    fields[key] = fields[key] || {};
  }

  for (const key of Object.keys(fields)) {
    const field = fields[key];

    if (field.default !== undefined && !builder.includes(key)) {
      field.optional = true;
    }
    if (field.default === undefined) {
      field.default = null;
    } else if (!field.validate && field.default != null) {
      field.validate = assertValueType(getType(field.default));
    }

    for (const k of Object.keys(field)) {
      if (!validFieldKeys.has(k)) {
        throw new Error(`Unknown field key "${k}" on ${type}.${key}`);
      }
    }
  }

  VISITOR_KEYS[type] = opts.visitor = visitor;
  BUILDER_KEYS[type] = opts.builder = builder;
  NODE_FIELDS[type] = opts.fields = fields as FieldDefinitions<t.Node>;
  ALIAS_KEYS[type] = opts.aliases = aliases;
  aliases.forEach(alias => {
    FLIPPED_ALIAS_KEYS[alias] = FLIPPED_ALIAS_KEYS[alias] || [];
    FLIPPED_ALIAS_KEYS[alias].push(type);
  });

  if (opts.validate) {
    NODE_PARENT_VALIDATIONS[type] = opts.validate as Validator<t.Node>;
  }

  store[type] = opts as DefineTypeOpts<t.Node>;
}
