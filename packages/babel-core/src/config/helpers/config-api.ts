import semver from "semver";
import type { Targets } from "@babel/helper-compilation-targets";

import { version as coreVersion } from "../../";
import { assertSimpleType } from "../caching";
import type {
  CacheConfigurator,
  SimpleCacheConfigurator,
  SimpleType,
} from "../caching";

import type { CallerMetadata } from "../validation/options";

import * as Context from "../cache-contexts";

type EnvFunction = {
  (): string;
  <T>(extractor: (babelEnv: string) => T): T;
  (envVar: string): boolean;
  (envVars: Array<string>): boolean;
};

type CallerFactory = (
  extractor: (callerMetadata: CallerMetadata | void) => unknown,
) => SimpleType;
type TargetsFunction = () => Targets;
type AssumptionFunction = (name: string) => boolean | void;

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
} & ConfigAPI;

export type PluginAPI = {
  assumption: AssumptionFunction;
} & PresetAPI;

export function makeConfigAPI<SideChannel extends Context.SimpleConfig>(
  cache: CacheConfigurator<SideChannel>,
): ConfigAPI {
  const env: any = value =>
    cache.using(data => {
      if (typeof value === "undefined") return data.envName;
      if (typeof value === "function") {
        return assertSimpleType(value(data.envName));
      }
      if (!Array.isArray(value)) value = [value];

      return value.some((entry: unknown) => {
        if (typeof entry !== "string") {
          throw new Error("Unexpected non-string value");
        }
        return entry === data.envName;
      });
    });

  const caller = cb => cache.using(data => assertSimpleType(cb(data.caller)));

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
): PresetAPI {
  const targets = () =>
    // We are using JSON.parse/JSON.stringify because it's only possible to cache
    // primitive values. We can safely stringify the targets object because it
    // only contains strings as its properties.
    // Please make the Record and Tuple proposal happen!
    JSON.parse(cache.using(data => JSON.stringify(data.targets)));
  return { ...makeConfigAPI(cache), targets };
}

export function makePluginAPI<SideChannel extends Context.SimplePlugin>(
  cache: CacheConfigurator<SideChannel>,
): PluginAPI {
  const assumption = name => cache.using(data => data.assumptions[name]);

  return { ...makePresetAPI(cache), assumption };
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
