import * as helpers from "./helpers";

export function get(name) {
  let fn = helpers[name] || helpers[`_${name}`];
  if (!fn) throw ReferenceError;

  return fn().expression;
}

export let list = Object.keys(helpers).filter(name => name !== "__esModule");

export default get;
