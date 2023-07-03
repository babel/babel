// TODO(Babel 8): Use "semver" directly
import semver from "@nicolo-ribaudo/semver-v6";
import type { Targets } from "@babel/helper-compilation-targets";

import { version as coreVersion } from "../../";
import { assertSimpleType } from "../caching";
import type {
  CacheConfigurator,
  SimpleCacheConfigurator,
  SimpleType,
} from "../caching";

import type { AssumptionName, CallerMetadata } from "../validation/options";

import type * as Context from "../cache-contexts";

type EnvFunction = {
  (): string;
  <T>(extractor: (babelEnv: string) => T): T;
  (envVar: string): boolean;
  (envVars: Array<string>): boolean;
};

type CallerFactory = (
  extractor: (callerMetadata: CallerMetadata | undefined) => unknown,
) => SimpleType;
type TargetsFunction = () => Targets;
type AssumptionFunction = (name: AssumptionName) => boolean | undefined;

export type ConfigAPI = {
  version: string;
  cache: SimpleCacheConfigurator;
  env: EnvFunction;
  async: () => boolean;
  assertVersion: typeof assertVersion;
  caller?: CallerFactory;
};

export type PresetAPI = {
  targets: TargetsFunction;
  addExternalDependency: (ref: string) => void;
} & ConfigAPI;

export type PluginAPI = {
  assumption: AssumptionFunction;
} & PresetAPI;

export function makeConfigAPI<SideChannel extends Context.SimpleConfig>(
  cache: CacheConfigurator<SideChannel>,
): ConfigAPI {
  // TODO(@nicolo-ribaudo): If we remove the explicit type from `value`
  // and the `as any` type cast, TypeScript crashes in an infinite
  // recursion. After upgrading to TS4.7 and finishing the noImplicitAny
  // PR, we should check if it still crashes and report it to the TS team.
  const env: EnvFunction = ((
    value: string | string[] | (<T>(babelEnv: string) => T),
  ) =>
    cache.using(data => {
      if (typeof value === "undefined") return data.envName;
      if (typeof value === "function") {
        return assertSimpleType(value(data.envName));
      }
      return (Array.isArray(value) ? value : [value]).some(entry => {
        if (typeof entry !== "string") {
          throw new Error("Unexpected non-string value");
        }
        return entry === data.envName;
      });
    })) as any;

  const caller = (cb: {
    (CallerMetadata: CallerMetadata | undefined): SimpleType;
  }) => cache.using(data => assertSimpleType(cb(data.caller)));

  return {
    version: coreVersion,
    cache: cache.simple(),
    // Expose ".env()" so people can easily get the same env that we expose using the "env" key.
    env,
    async: () => false,
    caller,
    assertVersion,
  };
}

export function makePresetAPI<SideChannel extends Context.SimplePreset>(
  cache: CacheConfigurator<SideChannel>,
  externalDependencies: Array<string>,
): PresetAPI {
  const targets = () =>
    // We are using JSON.parse/JSON.stringify because it's only possible to cache
    // primitive values. We can safely stringify the targets object because it
    // only contains strings as its properties.
    // Please make the Record and Tuple proposal happen!
    JSON.parse(cache.using(data => JSON.stringify(data.targets)));

  const addExternalDependency = (ref: string) => {
    externalDependencies.push(ref);
  };

  return { ...makeConfigAPI(cache), targets, addExternalDependency };
}

export function makePluginAPI<SideChannel extends Context.SimplePlugin>(
  cache: CacheConfigurator<SideChannel>,
  externalDependencies: Array<string>,
): PluginAPI {
  const assumption = (name: string) =>
    cache.using(data => data.assumptions[name]);

  return { ...makePresetAPI(cache, externalDependencies), assumption };
}

function assertVersion(range: string | number): void {
  if (typeof range === "number") {
    if (!Number.isInteger(range)) {
      throw new Error("Expected string or integer value.");
    }
    range = `^${range}.0.0-0`;
  }
  if (typeof range !== "string") {
    throw new Error("Expected string or integer value.");
  }
  // TODO(Babel 8): Update all the version checks
  if (process.env.BABEL_8_BREAKING) {
    range += ` || ^8.0.0-0`;
  }

  if (semver.satisfies(coreVersion, range)) return;

  const limit = Error.stackTraceLimit;

  if (typeof limit === "number" && limit < 25) {
    // Bump up the limit if needed so that users are more likely
    // to be able to see what is calling Babel.
    Error.stackTraceLimit = 25;
  }

  const err = new Error(
    `Requires Babel "${range}", but was loaded with "${coreVersion}". ` +
      `If you are sure you have a compatible version of @babel/core, ` +
      `it is likely that something in your build process is loading the ` +
      `wrong version. Inspect the stack trace of this error to look for ` +
      `the first entry that doesn't mention "@babel/core" or "babel-core" ` +
      `to see what is calling Babel.`,
  );

  if (typeof limit === "number") {
    Error.stackTraceLimit = limit;
  }

  throw Object.assign(err, {
    code: "BABEL_VERSION_UNSUPPORTED",
    version: coreVersion,
    range,
  });
}
