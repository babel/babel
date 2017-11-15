// @flow
import type { CacheConfigurator, SimpleCacheConfigurator } from "../caching";

type EnvFunction = {
  (): string,
  <T>((string) => T): T,
  (string): boolean,
  (Array<string>): boolean,
};

export type PluginAPI = {
  cache: SimpleCacheConfigurator,
  env: EnvFunction,
  async: () => boolean,
};

export default function makeAPI(
  cache: CacheConfigurator<{ envName: string }>,
): PluginAPI {
  const env: any = value =>
    cache.using(data => {
      if (typeof value === "undefined") return data.envName;
      if (typeof value === "function") return value(data.envName);
      if (!Array.isArray(value)) value = [value];

      return value.some(entry => {
        if (typeof entry !== "string") {
          throw new Error("Unexpected non-string value");
        }
        return entry === data.envName;
      });
    });

  return {
    cache: cache.simple(),
    // Expose ".env()" so people can easily get the same env that we expose using the "env" key.
    env,
    async: () => false,
  };
}
