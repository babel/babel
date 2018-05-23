import {
  assertString,
  assertFunction,
  assertObject,
  type ValidatorSet,
  type Validator,
} from "./option-assertions";

// Note: The casts here are just meant to be static assertions to make sure
// that the assertion functions actually assert that the value's type matches
// the declared types.
const VALIDATORS: ValidatorSet = {
  name: (assertString: Validator<$PropertyType<PluginObject, "name">>),
  manipulateOptions: (assertFunction: Validator<
    $PropertyType<PluginObject, "manipulateOptions">,
  >),
  pre: (assertFunction: Validator<$PropertyType<PluginObject, "pre">>),
  post: (assertFunction: Validator<$PropertyType<PluginObject, "post">>),
  inherits: (assertFunction: Validator<
    $PropertyType<PluginObject, "inherits">,
  >),
  visitor: (assertVisitorMap: Validator<
    $PropertyType<PluginObject, "visitor">,
  >),

  parserOverride: (assertFunction: Validator<
    $PropertyType<PluginObject, "parserOverride">,
  >),
  generatorOverride: (assertFunction: Validator<
    $PropertyType<PluginObject, "generatorOverride">,
  >),
};

function assertVisitorMap(key: string, value: mixed): VisitorMap {
  const obj = assertObject(key, value);
  if (obj) {
    Object.keys(obj).forEach(prop => assertVisitorHandler(prop, obj[prop]));

    if (obj.enter || obj.exit) {
      throw new Error(
        `.${key} cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.`,
      );
    }
  }
  return (obj: any);
}

function assertVisitorHandler(
  key: string,
  value: mixed,
): VisitorHandler | void {
  if (value && typeof value === "object") {
    Object.keys(value).forEach(handler => {
      if (handler !== "enter" && handler !== "exit") {
        throw new Error(
          `.visitor["${key}"] may only have .enter and/or .exit handlers.`,
        );
      }
    });
  } else if (typeof value !== "function") {
    throw new Error(`.visitor["${key}"] must be a function`);
  }

  return (value: any);
}

type VisitorHandler = Function | { enter?: Function, exit?: Function };
export type VisitorMap = {
  [string]: VisitorHandler,
};

export type PluginObject = {
  name?: string,
  manipulateOptions?: Function,

  pre?: Function,
  post?: Function,

  inherits?: Function,
  visitor?: VisitorMap,

  parserOverride?: Function,
  generatorOverride?: Function,
};

export function validatePluginObject(obj: {}): PluginObject {
  Object.keys(obj).forEach(key => {
    const validator = VALIDATORS[key];

    if (validator) validator(key, obj[key]);
    else throw new Error(`.${key} is not a valid Plugin property`);
  });

  return (obj: any);
}
