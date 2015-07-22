import packageJson from '../package.json';

if (global._babelPolyfill === packageJson.version) {
  throw new Error(`Polyfill package ${packageJson.version} doesn't match previously loaded version: ${global._babelPolyfill}`);
}
global._babelPolyfill = packageJson.version;

import "core-js/shim";
import "regenerator/runtime";
