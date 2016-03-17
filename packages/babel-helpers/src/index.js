/* eslint no-confusing-arrow: 0 */

import helpers from "./helpers";

export function get(name) {
  let fn = helpers[name];
  if (!fn) throw new ReferenceError(`Unknown helper ${name}`);

  return fn().expression;
}

export let list = Object.keys(helpers)
  .map((name) => name[0] === "_" ? name.slice(1) : name)
  .filter((name) => name !== "__esModule");

export default get;
