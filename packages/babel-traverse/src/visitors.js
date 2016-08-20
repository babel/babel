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

    let deprecatedKey = t.DEPRECATED_KEYS[nodeType];
    if (deprecatedKey) {
      console.trace(`Visitor defined for ${nodeType} but it has been renamed to ${deprecatedKey}`);
      aliases = [deprecatedKey];
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

  // explode lossy methods
  for (let nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    let fns = visitor[nodeType];
    ensureCallbackArrays(fns);
    if (!fns.lossy) continue;

    // `lossy` could be an empty array due to prior normalisation which will mess with our
    // detection
    fns.lossy = false;
    if (!fns.lossy.length) continue;

    if (fns.lossy.length > 1) {
      throw new TypeError(`Visitor ${nodeType} has more than one lossy method`);
    }

    // flag these methods as `lossy` so if we need to merge the `exit` handler we can
    // properly shift the `lossy` method to the end
    for (let fn of fns) fn.lossy = true;

    // declare this visitor as having a lossy method so `visitors.merge` can complain
    fns.lossy = true;
    mergePair(fns, { exit: fns.lossy });
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
        let path = `${nodeType}.${visitorKey}`;
        if (visitorKey === "lossy") {
          validateVisitorMethod(path, visitors[visitorKey]);
        } else if (visitorKey === "enter" || visitorKey === "exit") {
          // verify that it just contains functions
          validateVisitorMethods(path, visitors[visitorKey]);
        } else {
          throw new Error(messages.get("traverseVerifyVisitorProperty", nodeType, visitorKey));
        }
      }
    }
  }

  visitor._verified = true;
}

function validateVisitorMethod(path, fn) {
  if (typeof fn !== "function") {
    throw new TypeError(`Non-function found defined in ${path} with type ${typeof fn}`);
  }
}

function validateVisitorMethods(path, val) {
  let fns = [].concat(val);
  for (let fn of fns) {
    validateVisitorMethod(path, fn);
  }
}

export function merge(visitors: Array, states: Array = []) {
  let rootVisitor = {};

  for (let i = 0; i < visitors.length; i++) {
    let visitor = visitors[i];
    let state = states[i];

    explode(visitor);

    for (let type in visitor) {
      let visitorType = visitor[type];

      // if we have state then overload the callbacks to take it
      if (state) visitorType = wrapWithState(visitorType, state);

      let nodeVisitor = rootVisitor[type] = rootVisitor[type] || {};

      // prevent duplicate lossy methods
      if (nodeVisitor.lossy && visitorType.lossy) {
        throw new TypeError(
          `Visitor ${getId(visitorType)}.${visitorType} is trying to redeclare a lossy ` +
          `visitor method that was already specified by ${getId(nodeVisitor)}`
        );
      }

      mergePair(nodeVisitor, visitorType);

      // shift lossy methods to the end
      if (visitorType.exit) {
        // loop over all visitor methods, we ignore the last function as if it's lossy
        // then it's already in the right place and we can avoid some operations
        for (let i = 0; i < nodeVisitor.exit.length - 1; i++) {
          let fn = nodeVisitor.exit[i];
          if (!fn.lossy) continue;

          // remove it from the array
          nodeVisitor.exit.splice(i, 1);

          // push it back onto the end
          nodeVisitor.exit.push(fn);

          // we can only have one lossy method per node type so we can break
          break;
        }
      }
    }
  }

  return rootVisitor;
}

function getId(visitor) {
  return visitor._id || "unknown";
}

function wrapWithState(oldVisitor, state) {
  let newVisitor = {};

  for (let key in oldVisitor) {
    let fns = oldVisitor[key];

    // not an enter/exit array of callbacks
    if (!Array.isArray(fns)) continue;

    fns = fns.map(function (fn) {
      let newFn = function (path) {
        return fn.call(state, path, state);
      };
      newFn.toString = () => fn.toString();
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
  if (key === "enter" || key === "exit" || key === "lossy" || key === "shouldSkip") return true;

  // ignore other options
  if (key === "blacklist" || key === "noScope" || key === "skipKeys") return true;

  return false;
}

function mergePair(dest, src) {
  for (let key in src) {
    dest[key] = [].concat(dest[key] || [], src[key]);
  }
}
