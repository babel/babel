import {
  assertString,
  assertFunction,
  assertObject,
  msg,
} from "./option-assertions";

import type {
  ValidatorSet,
  Validator,
  OptionPath,
  RootPath,
} from "./option-assertions";

// Note: The casts here are just meant to be static assertions to make sure
// that the assertion functions actually assert that the value's type matches
// the declared types.
const VALIDATORS: ValidatorSet = {
  name: assertString as Validator<PluginObject["name"]>,
  manipulateOptions: assertFunction as Validator<
    PluginObject["manipulateOptions"]
  >,
  pre: assertFunction as Validator<PluginObject["pre"]>,
  post: assertFunction as Validator<PluginObject["post"]>,
  inherits: assertFunction as Validator<PluginObject["inherits"]>,
  visitor: assertVisitorMap as Validator<PluginObject["visitor"]>,

  parserOverride: assertFunction as Validator<PluginObject["parserOverride"]>,
  generatorOverride: assertFunction as Validator<
    PluginObject["generatorOverride"]
  >,
};

function assertVisitorMap(loc: OptionPath, value: unknown): VisitorMap {
  const obj = assertObject(loc, value);
  if (obj) {
    Object.keys(obj).forEach(prop => assertVisitorHandler(prop, obj[prop]));

    // @ts-ignore
    if (obj.enter || obj.exit) {
      throw new Error(
        `${msg(
          loc,
        )} cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.`,
      );
    }
  }
  return obj as VisitorMap;
}

function assertVisitorHandler(
  key: string,
  value: unknown,
): VisitorHandler | void {
  if (value && typeof value === "object") {
    Object.keys(value).forEach((handler: string) => {
      if (handler !== "enter" && handler !== "exit") {
        throw new Error(
          `.visitor["${key}"] may only have .enter and/or .exit handlers.`,
        );
      }
    });
  } else if (typeof value !== "function") {
    throw new Error(`.visitor["${key}"] must be a function`);
  }

  return value as any;
}

type VisitorHandler =
  | Function
  | {
      enter?: Function;
      exit?: Function;
    };

export type VisitorMap = {
  [x: string]: VisitorHandler;
};

export type PluginObject = {
  name?: string;
  manipulateOptions?: (options: unknown, parserOpts: unknown) => void;
  pre?: Function;
  post?: Function;
  inherits?: Function;
  visitor?: VisitorMap;
  parserOverride?: Function;
  generatorOverride?: Function;
};

export function validatePluginObject(obj: {}): PluginObject {
  const rootPath: RootPath = {
    type: "root",
    source: "plugin",
  };
  Object.keys(obj).forEach((key: string) => {
    const validator = VALIDATORS[key];

    if (validator) {
      const optLoc: OptionPath = {
        type: "option",
        name: key,
        parent: rootPath,
      };
      validator(optLoc, obj[key]);
    } else {
      const invalidPluginPropertyError = new Error(
        `.${key} is not a valid Plugin property`,
      );
      // @ts-expect-error todo(flow->ts) consider additing BabelConfigError with code field
      invalidPluginPropertyError.code = "BABEL_UNKNOWN_PLUGIN_PROPERTY";
      throw invalidPluginPropertyError;
    }
  });

  return obj as any;
}
