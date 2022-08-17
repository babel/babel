import * as virtualTypes from "./path/lib/virtual-types";
import { DEPRECATED_KEYS, FLIPPED_ALIAS_KEYS, TYPES } from "@babel/types";
import type { NodePath, Visitor } from "./index";

type VIRTUAL_TYPES = keyof typeof virtualTypes;
function isVirtualType(type: string): type is VIRTUAL_TYPES {
  return type in virtualTypes;
}

/**
 * explode() will take a visitor object with all of the various shorthands
 * that we support, and validates & normalizes it into a common format, ready
 * to be used in traversal
 *
 * The various shorthands are:
 * * `Identifier() { ... }` -> `Identifier: { enter() { ... } }`
 * * `"Identifier|NumericLiteral": { ... }` -> `Identifier: { ... }, NumericLiteral: { ... }`
 * * Aliases in `@babel/types`: e.g. `Property: { ... }` -> `ObjectProperty: { ... }, ClassProperty: { ... }`
 *
 * Other normalizations are:
 * * Visitors of virtual types are wrapped, so that they are only visited when
 *   their dynamic check passes
 * * `enter` and `exit` functions are wrapped in arrays, to ease merging of
 *   visitors
 */
export function explode(visitor: Visitor) {
  if (visitor._exploded) return visitor;
  visitor._exploded = true;

  // normalise pipes
  for (const nodeType of Object.keys(visitor) as (keyof Visitor)[]) {
    if (shouldIgnoreKey(nodeType)) continue;

    const parts: Array<string> = nodeType.split("|");
    if (parts.length === 1) continue;

    const fns = visitor[nodeType];
    delete visitor[nodeType];

    for (const part of parts) {
      // @ts-expect-error part will be verified by `verify` later
      visitor[part] = fns;
    }
  }

  // verify data structure
  verify(visitor);

  // make sure there's no __esModule type since this is because we're using loose mode
  // and it sets __esModule to be enumerable on all modules :(
  // @ts-expect-error ESModule interop
  delete visitor.__esModule;

  // ensure visitors are objects
  ensureEntranceObjects(visitor);

  // ensure enter/exit callbacks are arrays
  ensureCallbackArrays(visitor);

  // add type wrappers
  for (const nodeType of Object.keys(visitor)) {
    if (shouldIgnoreKey(nodeType)) continue;

    if (!isVirtualType(nodeType)) continue;

    // wrap all the functions
    const fns = visitor[nodeType];
    for (const type of Object.keys(fns)) {
      // @ts-expect-error manipulating visitors
      fns[type] = wrapCheck(nodeType, fns[type]);
    }

    // clear it from the visitor
    delete visitor[nodeType];

    const types = virtualTypes[nodeType];
    if (types !== null) {
      for (const type of types) {
        // merge the visitor if necessary or just put it back in
        if (visitor[type]) {
          mergePair(visitor[type], fns);
        } else {
          // @ts-expect-error Expression produces too complex union
          visitor[type] = fns;
        }
      }
    } else {
      mergePair(visitor, fns);
    }
  }

  // add aliases
  for (const nodeType of Object.keys(visitor) as (keyof Visitor)[]) {
    if (shouldIgnoreKey(nodeType)) continue;

    const fns = visitor[nodeType];

    let aliases = FLIPPED_ALIAS_KEYS[nodeType];

    const deprecatedKey = DEPRECATED_KEYS[nodeType];
    if (deprecatedKey) {
      console.trace(
        `Visitor defined for ${nodeType} but it has been renamed to ${deprecatedKey}`,
      );
      aliases = [deprecatedKey];
    }

    if (!aliases) continue;

    // clear it from the visitor
    delete visitor[nodeType];

    for (const alias of aliases) {
      const existing = visitor[alias];
      if (existing) {
        mergePair(existing, fns);
      } else {
        // @ts-expect-error Expression produces a union type that is too complex to represent.
        visitor[alias] = { ...fns };
      }
    }
  }

  for (const nodeType of Object.keys(visitor)) {
    if (shouldIgnoreKey(nodeType)) continue;

    ensureCallbackArrays(
      // @ts-expect-error nodeType must present in visitor after previous validations
      visitor[nodeType],
    );
  }

  return visitor;
}

export function verify(visitor: Visitor) {
  if (visitor._verified) return;

  if (typeof visitor === "function") {
    throw new Error(
      "You passed `traverse()` a function when it expected a visitor object, " +
        "are you sure you didn't mean `{ enter: Function }`?",
    );
  }

  for (const nodeType of Object.keys(visitor) as (keyof Visitor)[]) {
    if (nodeType === "enter" || nodeType === "exit") {
      validateVisitorMethods(nodeType, visitor[nodeType]);
    }

    if (shouldIgnoreKey(nodeType)) continue;

    if (TYPES.indexOf(nodeType) < 0) {
      throw new Error(
        `You gave us a visitor for the node type ${nodeType} but it's not a valid type`,
      );
    }

    const visitors = visitor[nodeType];
    if (typeof visitors === "object") {
      for (const visitorKey of Object.keys(visitors)) {
        if (visitorKey === "enter" || visitorKey === "exit") {
          // verify that it just contains functions
          validateVisitorMethods(
            `${nodeType}.${visitorKey}`,
            visitors[visitorKey],
          );
        } else {
          throw new Error(
            "You passed `traverse()` a visitor object with the property " +
              `${nodeType} that has the invalid property ${visitorKey}`,
          );
        }
      }
    }
  }

  visitor._verified = true;
}

function validateVisitorMethods(
  path: string,
  val: any,
): asserts val is Function | Function[] {
  const fns = [].concat(val);
  for (const fn of fns) {
    if (typeof fn !== "function") {
      throw new TypeError(
        `Non-function found defined in ${path} with type ${typeof fn}`,
      );
    }
  }
}

export function merge<State>(visitors: Visitor<State>[]): Visitor<State>;
export function merge(
  visitors: Visitor<unknown>[],
  states?: any[],
  wrapper?: Function | null,
): Visitor<unknown>;
export function merge(
  visitors: any[],
  states: any[] = [],
  wrapper?: Function | null,
) {
  const rootVisitor: Visitor = {};

  for (let i = 0; i < visitors.length; i++) {
    const visitor = visitors[i];
    const state = states[i];

    explode(visitor);

    for (const type of Object.keys(visitor) as (keyof Visitor)[]) {
      let visitorType = visitor[type];

      // if we have state or wrapper then overload the callbacks to take it
      if (state || wrapper) {
        visitorType = wrapWithStateOrWrapper(visitorType, state, wrapper);
      }

      // @ts-expect-error: Expression produces a union type that is too complex to represent.
      const nodeVisitor = (rootVisitor[type] ||= {});
      mergePair(nodeVisitor, visitorType);
    }
  }

  return rootVisitor;
}

function wrapWithStateOrWrapper<State>(
  oldVisitor: Visitor<State>,
  state: State,
  wrapper?: Function | null,
) {
  const newVisitor: Visitor = {};

  for (const key of Object.keys(oldVisitor) as (keyof Visitor<State>)[]) {
    let fns = oldVisitor[key];

    // not an enter/exit array of callbacks
    if (!Array.isArray(fns)) continue;

    // @ts-expect-error manipulating visitors
    fns = fns.map(function (fn) {
      let newFn = fn;

      if (state) {
        newFn = function (path: NodePath) {
          return fn.call(state, path, state);
        };
      }

      if (wrapper) {
        // @ts-expect-error Fixme: document state.key
        newFn = wrapper(state.key, key, newFn);
      }

      // Override toString in case this function is printed, we want to print the wrapped function, same as we do in `wrapCheck`
      if (newFn !== fn) {
        newFn.toString = () => fn.toString();
      }

      return newFn;
    });

    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    newVisitor[key] = fns;
  }

  return newVisitor;
}

function ensureEntranceObjects(obj: Visitor) {
  for (const key of Object.keys(obj) as (keyof Visitor)[]) {
    if (shouldIgnoreKey(key)) continue;

    const fns = obj[key];
    if (typeof fns === "function") {
      // @ts-expect-error: Expression produces a union type that is too complex to represent.
      obj[key] = { enter: fns };
    }
  }
}

function ensureCallbackArrays(obj: Visitor) {
  // @ts-expect-error normalizing enter property
  if (obj.enter && !Array.isArray(obj.enter)) obj.enter = [obj.enter];
  // @ts-expect-error normalizing exit property
  if (obj.exit && !Array.isArray(obj.exit)) obj.exit = [obj.exit];
}

function wrapCheck(nodeType: VIRTUAL_TYPES, fn: Function) {
  const newFn = function (this: unknown, path: NodePath) {
    if (path[`is${nodeType}`]()) {
      return fn.apply(this, arguments);
    }
  };
  newFn.toString = () => fn.toString();
  return newFn;
}

function shouldIgnoreKey(
  key: string,
): key is
  | "enter"
  | "exit"
  | "shouldSkip"
  | "denylist"
  | "noScope"
  | "skipKeys"
  | "blacklist" {
  // internal/hidden key
  if (key[0] === "_") return true;

  // ignore function keys
  if (key === "enter" || key === "exit" || key === "shouldSkip") return true;

  // ignore other options
  if (
    key === "denylist" ||
    key === "noScope" ||
    key === "skipKeys" ||
    // TODO: Remove in Babel 8
    key === "blacklist"
  ) {
    return true;
  }

  return false;
}

function mergePair(dest: any, src: any) {
  for (const key of Object.keys(src)) {
    dest[key] = [].concat(dest[key] || [], src[key]);
  }
}
