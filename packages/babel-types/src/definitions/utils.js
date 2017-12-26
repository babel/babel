// @flow
import is from "../validators/is";

export const VISITOR_KEYS: { [string]: Array<string> } = {};
export const ALIAS_KEYS: { [string]: Array<string> } = {};
export const FLIPPED_ALIAS_KEYS: { [string]: Array<string> } = {};
export const NODE_FIELDS: { [string]: {} } = {};
export const BUILDER_KEYS: { [string]: Array<string> } = {};
export const DEPRECATED_KEYS: { [string]: string } = {};

function getType(val) {
  if (Array.isArray(val)) {
    return "array";
  } else if (val === null) {
    return "null";
  } else if (val === undefined) {
    return "undefined";
  } else {
    return typeof val;
  }
}

// TODO: Import and use Node instead of any
opaque type Validator = (any, string, any) => void;

type FieldOptions = {
  default?: boolean,
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
      callback(node, `${key}[${i}]`, val[i]);
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
    let valid = false;

    for (const type of types) {
      if (is(type, val)) {
        valid = true;
        break;
      }
    }

    if (!valid) {
      throw new TypeError(
        `Property ${key} of ${
          node.type
        } expected node to be of a type ${JSON.stringify(types)} ` +
          `but instead got ${JSON.stringify(val && val.type)}`,
      );
    }
  }

  validate.oneOfNodeTypes = types;

  return validate;
}

export function assertNodeOrValueType(...types: Array<string>): Validator {
  function validate(node, key, val) {
    let valid = false;

    for (const type of types) {
      if (getType(val) === type || is(type, val)) {
        valid = true;
        break;
      }
    }

    if (!valid) {
      throw new TypeError(
        `Property ${key} of ${
          node.type
        } expected node to be of a type ${JSON.stringify(types)} ` +
          `but instead got ${JSON.stringify(val && val.type)}`,
      );
    }
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

export function chain(...fns: Array<Validator>): Validator {
  function validate(...args) {
    for (const fn of fns) {
      fn(...args);
    }
  }
  validate.chainOf = fns;
  return validate;
}

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
  } = {},
) {
  const inherits = (opts.inherits && store[opts.inherits]) || {};

  const fields: Object = opts.fields || inherits.fields || {};
  const visitor: Array<string> = opts.visitor || inherits.visitor || [];
  const aliases: Array<string> = opts.aliases || inherits.aliases || [];
  const builder: Array<string> =
    opts.builder || inherits.builder || opts.visitor || [];

  if (opts.deprecatedAlias) {
    DEPRECATED_KEYS[opts.deprecatedAlias] = type;
  }

  // ensure all field keys are represented in `fields`
  for (const key of (visitor.concat(builder): Array<string>)) {
    fields[key] = fields[key] || {};
  }

  for (const key in fields) {
    const field = fields[key];

    if (builder.indexOf(key) === -1) {
      field.optional = true;
    }
    if (field.default === undefined) {
      field.default = null;
    } else if (!field.validate) {
      field.validate = assertValueType(getType(field.default));
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

  store[type] = opts;
}

const store = {};
