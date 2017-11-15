// @flow
import type { CacheConfigurator, SimpleCacheConfigurator } from "../caching";

export type PluginAPI = {
  cache: SimpleCacheConfigurator,
  env: () => string,
  async: () => boolean,
};

export default function makeAPI(
  cache: CacheConfigurator<{ envName: string }>,
): PluginAPI {
  return {
    cache: cache.simple(),
    // Expose ".env()" so people can easily get the same env that we expose using the "env" key.
    env: () => cache.using(data => data.envName),
    async: () => false,
  };
}
