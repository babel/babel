import factory from "./string";
import template from "./literal";

export default function(firstArg, ...rest) {
  if (typeof firstArg === "string") {
    return factory(firstArg, ...rest);
  } else {
    return template(firstArg, ...rest);
  }
}
