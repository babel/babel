// @flow
import toIdentifier from "./toIdentifier";

export default function toBindingIdentifierName(name: string): string {
  name = toIdentifier(name);
  if (name === "eval" || name === "arguments") name = "_" + name;

  return name;
}
