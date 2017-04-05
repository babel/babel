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
  return manageOptions(opts);
}
