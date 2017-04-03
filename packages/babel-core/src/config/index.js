import type Plugin from "./plugin";
import manageOptions from "./option-manager";

export type ResolvedConfig = {
  options: Object,
  passes: Array<Array<Plugin>>,
};

/**
 * Standard API for loading Babel configuration data. Not for public consumption.
 */
export default function loadConfig(opts: Object): ResolvedConfig|null {
  const mergedOpts = manageOptions(opts);
  if (!mergedOpts) return null;

  let passes = [];
  if (mergedOpts.plugins) {
    passes.push(mergedOpts.plugins);
  }

  // With "passPerPreset" enabled there may still be presets in the options.
  if (mergedOpts.presets) {
    passes = passes.concat(mergedOpts.presets.map((preset) => preset.plugins).filter(Boolean));
  }

  return {
    options: mergedOpts,
    passes,
  };
}
