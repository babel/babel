// @flow

import {
  assertString,
  assertFunction,
  assertObject,
  type ValidatorSet,
  type Validator,
} from "./option-assertions";

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
};

export function validatePluginObject(obj: {}): PluginObject {
  Object.keys(obj).forEach(key => {
    const validator = VALIDATORS[key];

    if (validator) validator(key, obj[key]);
    else throw new Error(`.${key} is not a valid Plugin property`);
  });

  return (obj: any);
}

export default class Plugin {
  key: ?string;
  manipulateOptions: Function | void;
  post: Function | void;
  pre: Function | void;
  visitor: {};

  options: {};

  constructor(plugin: PluginObject, options: {}, key?: string) {
    this.key = plugin.name || key;

    this.manipulateOptions = plugin.manipulateOptions;
    this.post = plugin.post;
    this.pre = plugin.pre;
    this.visitor = plugin.visitor || {};
    this.options = options;
  }
}
