// @flow
import is from "../validators/is";
import { validateField, validateChild } from "../validators/validate";

export const VISITOR_KEYS: { [string]: Array<string> } = {};
export const ALIAS_KEYS: { [string]: Array<string> } = {};
export const FLIPPED_ALIAS_KEYS: { [string]: Array<string> } = {};
export const NODE_FIELDS: { [string]: {} } = {};
export const BUILDER_KEYS: { [string]: Array<string> } = {};
export const DEPRECATED_KEYS: { [string]: string } = {};
export const NODE_PARENT_VALIDATIONS = {};

function getType(val) {
  if (Array.isArray(val)) {
    return "array";
  } else if (val === null) {
    return "null";
  } else {
    return typeof val;
  }
}

// TODO: Import and use Node instead of any
type Validator = (any, string, any) => void;

type FieldOptions = {
  default?: any,
  optional?: boolean,
  validate?: Validator,
};

export function validate(validate: Validator): FieldOptions {
  return { validate };
}

export function typeIs(typeName: string | string[]) {
  return typeof typeName === "string"
    ? assertNodeType(typeName)
    : assertNodeType(...typeName);
}

export function validateType(typeName: string | string[]) {
  return validate(typeIs(typeName));
}

export function validateOptional(validate: Validator): FieldOptions {
  return { validate, optional: true };
}

export function validateOptionalType(
  typeName: string | string[],
): FieldOptions {
  return { validate: typeIs(typeName), optional: true };
}

export function arrayOf(elementType: Validator): Validator {
  return chain(assertValueType("array"), assertEach(elementType));
}

export function arrayOfType(typeName: string | string[]) {
  return arrayOf(typeIs(typeName));
}

export function validateArrayOfType(typeName: string | string[]) {
  return validate(arrayOfType(typeName));
}

export function assertEach(callback: Validator): Validator {
  function validator(node, key, val) {
    if (!Array.isArray(val)) return;

    for (let i = 0; i < val.length; i++) {
      const subkey = `${key}[${i}]`;
      const v = val[i];
      callback(node, subkey, v);
      validateChild(node, subkey, v);
    }
  }
  validator.each = callback;
  return validator;
}

export function assertOneOf(...values: Array<any>): Validator {
  function validate(node: Object, key: string, val: any) {
    if (values.indexOf(val) < 0) {
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

export function assertNodeType(...types: Array<string>): Validator {
  function validate(node, key, val) {
    for (const type of types) {
      if (is(type, val)) {
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

  validate.oneOfNodeTypes = types;

  return validate;
}

export function assertNodeOrValueType(...types: Array<string>): Validator {
  function validate(node, key, val) {
    for (const type of types) {
      if (getType(val) === type || is(type, val)) {
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

export function assertValueType(type: string): Validator {
  function validate(node, key, val) {
    const valid = getType(val) === type;

    if (!valid) {
      throw new TypeError(
        `Property ${key} expected type of ${type} but got ${getType(val)}`,
      );
    }
  }

  validate.type = type;

  return validate;
}

export function assertShape(shape: { [string]: FieldOptions }): Validator {
  function validate(node, key, val) {
    const errors = [];
    for (const property of Object.keys(shape)) {
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

export function assertOptionalChainStart(): Validator {
  function validate(node) {
    let current = node;
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

export function chain(...fns: Array<Validator>): Validator {
  function validate(...args) {
    for (const fn of fns) {
      fn(...args);
    }
  }
  validate.chainOf = fns;
  return validate;
}

const validTypeOpts = [
  "aliases",
  "builder",
  "deprecatedAlias",
  "fields",
  "inherits",
  "visitor",
  "validate",
];
const validFieldKeys = ["default", "optional", "validate"];

export default function defineType(
  type: string,
  opts: {
    fields?: {
      [string]: FieldOptions,
    },
    visitor?: Array<string>,
    aliases?: Array<string>,
    builder?: Array<string>,
    inherits?: string,
    deprecatedAlias?: string,
    validate?: Validator,
  } = {},
) {
  const inherits = (opts.inherits && store[opts.inherits]) || {};

  let fields = opts.fields;
  if (!fields) {
    fields = {};
    if (inherits.fields) {
      const keys = Object.getOwnPropertyNames(inherits.fields);
      for (const key of (keys: Array<string>)) {
        const field = inherits.fields[key];
        fields[key] = {
          default: field.default,
          optional: field.optional,
          validate: field.validate,
        };
      }
    }
  }

  const visitor: Array<string> = opts.visitor || inherits.visitor || [];
  const aliases: Array<string> = opts.aliases || inherits.aliases || [];
  const builder: Array<string> =
    opts.builder || inherits.builder || opts.visitor || [];

  for (const k of (Object.keys(opts): Array<string>)) {
    if (validTypeOpts.indexOf(k) === -1) {
      throw new Error(`Unknown type option "${k}" on ${type}`);
    }
  }

  if (opts.deprecatedAlias) {
    DEPRECATED_KEYS[opts.deprecatedAlias] = type;
  }

  // ensure all field keys are represented in `fields`
  for (const key of (visitor.concat(builder): Array<string>)) {
    fields[key] = fields[key] || {};
  }

  for (const key of Object.keys(fields)) {
    const field = fields[key];

    if (field.default !== undefined && builder.indexOf(key) === -1) {
      field.optional = true;
    }
    if (field.default === undefined) {
      field.default = null;
    } else if (!field.validate && field.default != null) {
      field.validate = assertValueType(getType(field.default));
    }

    for (const k of (Object.keys(field): Array<string>)) {
      if (validFieldKeys.indexOf(k) === -1) {
        throw new Error(`Unknown field key "${k}" on ${type}.${key}`);
      }
    }
  }

  VISITOR_KEYS[type] = opts.visitor = visitor;
  BUILDER_KEYS[type] = opts.builder = builder;
  NODE_FIELDS[type] = opts.fields = fields;
  ALIAS_KEYS[type] = opts.aliases = aliases;
  aliases.forEach(alias => {
    FLIPPED_ALIAS_KEYS[alias] = FLIPPED_ALIAS_KEYS[alias] || [];
    FLIPPED_ALIAS_KEYS[alias].push(type);
  });

  if (opts.validate) {
    NODE_PARENT_VALIDATIONS[type] = opts.validate;
  }

  store[type] = opts;
}

const store = {};
