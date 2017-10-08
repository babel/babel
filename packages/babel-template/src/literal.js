import * as t from "@babel/types";

import factory from "./string";

export default function template(
  partials: Object | string[],
  ...args: Array<Object>
) {
  if (!Array.isArray(partials)) {
    // support template({ options })`string`
    return templateApply.bind(undefined, partials);
  }
  return templateApply(null, partials, ...args);
}

function templateApply(
  opts: Object | null,
  partials: string[],
  ...args: Array<Object>
) {
  if (partials.some(str => str.includes("$BABEL_TEMPLATE$"))) {
    throw new Error("Template contains illegal substring $BABEL_TEMPLATE$");
  }

  if (partials.length == 1) {
    return factory(partials[0], opts);
  }

  const replacementSet = new Set();
  const replacementMap = new Map();
  const replacementValueMap = new Map();
  let hasNonNumericReplacement = false;
  for (const arg of args) {
    if (replacementMap.has(arg)) {
      continue;
    }

    if (typeof arg === "number") {
      replacementMap.set(arg, `$${arg}`);
    } else if (typeof arg === "string") {
      // avoid duplicates should t.toIdentifier produce the same result for different arguments
      const replacementBase = `$BABEL_TEMPLATE$$${t.toIdentifier(arg)}`;
      let replacement = replacementBase;
      for (let i = 2; replacementSet.has(replacement); i++) {
        replacement = `${replacementBase}${i}`;
      }
      replacementSet.add(replacement);
      replacementMap.set(arg, replacement);
      hasNonNumericReplacement = true;
    } else {
      // there can't be duplicates as the size always grows
      const name = `$BABEL_TEMPLATE$VALUE$${replacementValueMap.size}`;

      // TODO: check if the arg is a Node
      replacementMap.set(arg, name);
      replacementValueMap.set(name, arg);
      hasNonNumericReplacement = true;
    }
  }

  if (hasNonNumericReplacement && replacementMap.has(0)) {
    throw new Error(
      "Template cannot have a '0' replacement and a named replacement at the same time",
    );
  }

  const code = partials.reduce((acc, partial, i) => {
    if (acc == null) {
      return partial;
    }

    const replacement = replacementMap.get(args[i - 1]);
    return `${acc}${replacement}${partial}`;
  }, null);

  const func = factory(code, opts);

  return (...args: Array<Object>) => {
    if (hasNonNumericReplacement) {
      const argObj = args[0] || {};
      const converted = {};

      for (const [key, replacement] of replacementMap) {
        if (typeof key === "number") continue;
        if (replacementValueMap.has(replacement)) {
          converted[replacement] = replacementValueMap.get(replacement);
        } else {
          converted[replacement] = argObj[key];
        }
      }

      args[0] = converted;
    }

    return func(...args);
  };
}
