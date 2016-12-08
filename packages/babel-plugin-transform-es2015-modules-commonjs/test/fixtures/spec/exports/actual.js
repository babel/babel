import { anything } from "outside"

var def;
export { def as default }

export function foo () {
  def = "export mutation";
  return "foo";
}

export class Bar {}

export const baz = foo();
