// @flow
import isValidIdentifier from "../validators/isValidIdentifier";

export default function toIdentifier(name: string): string {
  name = name + "";

  // replace all non-valid identifiers with dashes
  name = name.replace(/[^a-zA-Z0-9$_]/g, "-");

  // remove all dashes and numbers from start of name
  name = name.replace(/^[-0-9]+/, "");

  // camel case
  name = name.replace(/[-\s]+(.)?/g, function(match, c) {
    return c ? c.toUpperCase() : "";
  });

  if (!isValidIdentifier(name)) {
    name = `_${name}`;
  }

  return name || "_";
}
