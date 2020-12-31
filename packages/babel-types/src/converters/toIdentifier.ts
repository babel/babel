import isValidIdentifier from "../validators/isValidIdentifier";
import { isIdentifierChar } from "@babel/helper-validator-identifier";

export default function toIdentifier(input: string): string {
  input = input + "";

  // replace all non-valid identifiers with dashes
  let name = "";
  for (const c of input) {
    name += isIdentifierChar(c.codePointAt(0)) ? c : "-";
  }

  // remove all dashes and numbers from start of name
  name = name.replace(/^[-0-9]+/, "");

  // camel case
  name = name.replace(/[-\s]+(.)?/g, function (match, c) {
    return c ? c.toUpperCase() : "";
  });

  if (!isValidIdentifier(name)) {
    name = `_${name}`;
  }

  return name || "_";
}
