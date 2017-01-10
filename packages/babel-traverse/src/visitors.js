import * as virtualTypes from "./path/lib/virtual-types";
import * as messages from "babel-messages";
import * as t from "babel-types";
import clone from "lodash/clone";

/**
 * explode() will take a visitor object with all of the various shorthands
 * that we support, and validates & normalizes it into a common format, ready
 * to be used in traversal
 *
 * The various shorthands are:
 * * `Identifier() { ... }` -> `Identifier: { enter() { ... } }`
 * * `"Identifier|NumericLiteral": { ... }` -> `Identifier: { ... }, NumericLiteral: { ... }`
 * * Aliases in `babel-types`: e.g. `Property: { ... }` -> `ObjectProperty: { ... }, ClassProperty: { ... }`
 *
 * Other normalizations are:
 * * Visitors of virtual types are wrapped, so that they are only visited when
 *   their dynamic check passes
 * * `enter` and `exit` functions are wrapped in arrays, to ease merging of
 *   visitors
 */
export function explode(visitor) {
  if (visitor._exploded) return visitor;
  visitor._exploded = true;

  // normalise pipes
  for (let nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    let parts: Array<string> = nodeType.split("|");
    if (parts.length === 1) continue;

    let fns = visitor[nodeType];
    delete visitor[nodeType];

    for (let part of parts) {
      visitor[part] = fns;
    }
  }

  // verify data structure
  verify(visitor);

  // make sure there's no __esModule type since this is because we're using loose mode
  // and it sets __esModule to be enumerable on all modules :(
  delete visitor.__esModule;

  // ensure visitors are objects
  ensureEntranceObjects(visitor);

  // ensure enter/exit callbacks are arrays
  ensureCallbackArrays(visitor);

  // add type wrappers
  for (let nodeType of (Object.keys(visitor): Array)) {
    if (shouldIgnoreKey(nodeType)) continue;

    let wrapper = virtualTypes[nodeType];
    if (!wrapper) continue;

    // wrap all the functions
    let fns = visitor[nodeType];
    for (let type in fns) {
      fns[type] = wrapCheck(wrapper, fns[type]);
    }

    // clear it from the visitor
    delete visitor[nodeType];

    if (wrapper.types) {
      for (let type of (wrapper.types: Array<string>)) {
        // merge the visitor if necessary or just put it back in
        if (visitor[type]) {
          mergePair(visitor[type], fns);
        } else {
          visitor[type] = fns;
        }
      }
    } else {
      mergePair(visitor, fns);
    }
  }

  // add aliases
  for (let nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    let fns = visitor[nodeType];

    let aliases: ?Array<string> = t.FLIPPED_ALIAS_KEYS[nodeType];

    let deprecratedKey = t.DEPRECATED_KEYS[nodeType];
    if (deprecratedKey) {
      console.trace(`Visitor defined for ${nodeType} but it has been renamed to ${deprecratedKey}`);
      aliases = [deprecratedKey];
    }

    if (!aliases) continue;

    // clear it from the visitor
    delete visitor[nodeType];

    for (let alias of aliases) {
      let existing = visitor[alias];
      if (existing) {
        mergePair(existing, fns);
      } else {
        visitor[alias] = clone(fns);
      }
    }
  }

  for (let nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    ensureCallbackArrays(visitor[nodeType]);
  }

  return visitor;
}

export function verify(visitor) {
  if (visitor._verified) return;

  if (typeof visitor === "function") {
    throw new Error(messages.get("traverseVerifyRootFunction"));
  }

  for (let nodeType in visitor) {
    if (nodeType === "enter" || nodeType === "exit") {
      validateVisitorMethods(nodeType, visitor[nodeType]);
    }

    if (shouldIgnoreKey(nodeType)) continue;

    if (t.TYPES.indexOf(nodeType) < 0) {
      throw new Error(messages.get("traverseVerifyNodeType", nodeType));
    }

    let visitors = visitor[nodeType];
    if (typeof visitors === "object") {
      for (let visitorKey in visitors) {
        // ignore Object and Object prototype keys (in case the global Object has been modified)
        if (Object[visitorKey] != undefined || Object.prototype[visitorKey] != undefined) continue;
        
        if (visitorKey === "enter" || visitorKey === "exit") {
          // verify that it just contains functions
          validateVisitorMethods(`${nodeType}.${visitorKey}`, visitors[visitorKey]);
        } else {
          throw new Error(messages.get("traverseVerifyVisitorProperty", nodeType, visitorKey));
        }
      }
    }
  }

  visitor._verified = true;
}

function validateVisitorMethods(path, val) {
  let fns = [].concat(val);
  for (let fn of fns) {
    if (typeof fn !== "function") {
      throw new TypeError(`Non-function found defined in ${path} with type ${typeof fn}`);
    }
  }
}

export function merge(visitors: Array, states: Array = [], wrapper?: ?Function) {
  let rootVisitor = {};

  for (let i = 0; i < visitors.length; i++) {
    let visitor = visitors[i];
    let state = states[i];

    explode(visitor);

    for (let type in visitor) {
      // ignore Object and Object prototype keys (in case the global Object has been modified)
      if (Object[type] != undefined || Object.prototype[type] != undefined) continue;
      
      let visitorType = visitor[type];

      // if we have state or wrapper then overload the callbacks to take it
      if (state || wrapper) {
        visitorType = wrapWithStateOrWrapper(visitorType, state, wrapper);
      }

      let nodeVisitor = rootVisitor[type] = rootVisitor[type] || {};
      mergePair(nodeVisitor, visitorType);
    }
  }

  return rootVisitor;
}

function wrapWithStateOrWrapper(oldVisitor, state, wrapper: ?Function) {
  let newVisitor = {};

  for (let key in oldVisitor) {
    let fns = oldVisitor[key];

    // not an enter/exit array of callbacks
    if (!Array.isArray(fns)) continue;

    fns = fns.map(function (fn) {
      let newFn = fn;

      if (state) {
        newFn = function (path) {
          return fn.call(state, path, state);
        };
      }

      if (wrapper) {
        newFn = wrapper(state.key, key, newFn);
      }

      return newFn;
    });

    newVisitor[key] = fns;
  }

  return newVisitor;
}

function ensureEntranceObjects(obj) {
  for (let key in obj) {
    if (shouldIgnoreKey(key)) continue;

    let fns = obj[key];
    if (typeof fns === "function") {
      obj[key] = { enter: fns };
    }
  }
}

function ensureCallbackArrays(obj) {
  if (obj.enter && !Array.isArray(obj.enter)) obj.enter = [obj.enter];
  if (obj.exit && !Array.isArray(obj.exit)) obj.exit = [obj.exit];
}

function wrapCheck(wrapper, fn) {
  let newFn = function (path) {
    if (wrapper.checkPath(path)) {
      return fn.apply(this, arguments);
    }
  };
  newFn.toString = () => fn.toString();
  return newFn;
}

function shouldIgnoreKey(key) {
  // internal/hidden key
  if (key[0] === "_") return true;

  // ignore function keys
  if (key === "enter" || key === "exit" || key === "shouldSkip") return true;

  // ignore other options
  if (key === "blacklist" || key === "noScope" || key === "skipKeys") return true;

  // ignore Object and Object prototype keys (in case the global Object has been modified)
  if (Object[key] != undefined || Object.prototype[key] != undefined) return true;

  return false;
}

function mergePair(dest, src) {
  for (let key in src) {
    dest[key] = [].concat(dest[key] || [], src[key]);
  }
}
