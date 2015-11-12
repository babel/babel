import * as helpers from "./helpers";

export function get(name) {
  let fn = helpers[name] || helpers[`_${name}`];
  if (!fn) throw ReferenceError;

  return fn().expression;
}

export let list = Object.keys(helpers)
  .map(name => name[0] === "_" ? name.slice(1) : name)
  .filter(name => name !== "__esModule");

export default get;
