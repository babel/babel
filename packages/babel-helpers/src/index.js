import helpers from "./helpers";

export function get(name, opts) {
  const fn = helpers[name];
  if (!fn) throw new ReferenceError(`Unknown helper ${name}`);

  return fn(opts).expression;
}

export const list = Object.keys(helpers)
  .map(name => name.replace(/^_/, ""))
  .filter(name => name !== "__esModule");

export default get;
