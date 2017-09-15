import template from "babel-template";
import helpers from "../../lib/helpers";

// This is not garanteed to be 100% unique, but I hope
// no one will ever name a babel helper like "_$_$_$_foo_12"!
let i = 0;
function getHelperUid(name) {
  return `_$_$_$_${name}_${i++}`;
}

export default function defineHelper(name: string, code: string): string {
  const id = getHelperUid(name);
  helpers[id] = template(code, { sourceType: "module" });
  return id;
}
