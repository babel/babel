// @flow

import sha256 from "hash.js/lib/hash/sha/256";

type ComputedKey = {
  toString: () => string,
};
type PrimitiveKey = string | number | boolean | null | void;

type KeySet = Array<CacheKey>;
type KeyMap = { [string]: CacheKey };

export type CacheKey = PrimitiveKey | ComputedKey;

export { default as CACHE_KEY } from "./_cache-key";

export default function buildCacheKey(...args: Array<CacheKey>): ComputedKey {
  return {
    inspect: () => {
      return args.length === 1 ? args[0] : args;
    },
    toString: wrap(() => buildObjectHash(args)),
  };
}

buildCacheKey.obj = (arg: KeySet | KeyMap): ComputedKey => {
  return {
    inspect: () => arg,
    toString: wrap(() => buildObjectHash(arg)),
  };
};

buildCacheKey.error = (msg: string, inspectMsg?: string = msg): ComputedKey => {
  return {
    inspect: () => inspectMsg,
    toString: () => {
      throw new Error(msg);
    },
  };
};

buildCacheKey.lazy = (fn: () => CacheKey): ComputedKey => {
  let done = false;
  let value;

  function init() {
    if (done) return;

    value = fn();
    done = true;
  }

  return {
    inspect: () => {
      init();
      return value;
    },
    toString: wrap(() => {
      init();
      return stringify(value);
    }),
  };
};

function wrap(cb: () => string) {
  let generating = false;
  let sha;

  return () => {
    if (sha === undefined) {
      if (generating === true) {
        throw new Error("Cycle detected in cache key graph.");
      }

      generating = true;
      try {
        sha = cb();
      } finally {
        generating = false;
      }
    }
    return sha;
  };
}

function buildObjectHash(obj: KeySet | KeyMap): string {
  const hash = sha256();
  if (Array.isArray(obj)) {
    hash.update("[");
    obj.forEach(item => {
      hash.update(stringify(item));
      hash.update(",");
    });
    hash.update("]");
  } else {
    // simple object, create key from keys and props
    hash.update("{");
    for (const key of Object.keys(obj)) {
      hash.update(key);
      hash.update(":");
      hash.update(stringify(obj[key]));
      hash.update(",");
    }
    hash.update("}");
  }
  return hash.digest("hex");
}

// Validate that a value matches 'CacheKey'.
export function validKey(item: mixed): boolean {
  return (
    item == null ||
    typeof item === "string" ||
    typeof item === "number" ||
    typeof item === "boolean" ||
    (typeof item === "object" &&
      typeof item.toString === "function" &&
      item.toString !== Object.prototype.toString &&
      item.toString !== Array.prototype.toString &&
      item.toString !== Symbol.prototype.toString) ||
    (typeof item === "function" &&
      typeof item.toString === "function" &&
      item.toString !== Function.prototype.toString)
  );
}

function stringify(item: mixed): string {
  if (!validKey(item)) {
    throw new Error(
      "Items must be non-undefined primitives, or have meaningful toString implementations",
    );
  }

  // If we weren't compiling with loose mode, we could do `${item}`
  // $FlowIgnore - Flow doesn't like objects that opt into stringification.
  return "".concat(item);
}
