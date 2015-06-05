import * as virtualTypes from "./path/lib/virtual-types";
import * as messages from "../messages";
import * as t from "../types";
import clone from "lodash/lang/clone";
import esquery from "esquery";

export function explode(visitor) {
  if (visitor._exploded) return visitor;
  visitor._exploded = true;

  // make sure there's no __esModule type since this is because we're using loose mode
  // and it sets __esModule to be enumerable on all modules :(
  delete visitor.__esModule;

  if (visitor.queries) {
    ensureEntranceObjects(visitor.queries);
    addQueries(visitor);
    delete visitor.queries;
  }

  // ensure visitors are objects
  ensureEntranceObjects(visitor);

  // add type wrappers
  for (let nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    var wrapper = virtualTypes[nodeType];
    if (!wrapper) continue;

    // wrap all the functions
    let fns = visitor[nodeType];
    for (let type in fns) {
      fns[type] = wrapCheck(wrapper, fns[type]);
    }

    // clear it from the visitor
    delete visitor[nodeType];

    if (wrapper.types) {
      for (let type of (wrapper.types: Array)) {
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

    var aliases = t.FLIPPED_ALIAS_KEYS[nodeType];
    if (!aliases) continue;

    // clear it from the visitor
    delete visitor[nodeType];

    for (var alias of (aliases: Array)) {
      var existing = visitor[alias];
      if (existing) {
        mergePair(existing, fns);
      } else {
        visitor[alias] = clone(fns);
      }
    }
  }

  return visitor;
}

export function verify(visitor) {
  if (visitor._verified) return;

  if (typeof visitor === "function") {
    throw new Error(messages.get("traverseVerifyRootFunction"));
  }

  for (var nodeType in visitor) {
    if (shouldIgnoreKey(nodeType)) continue;

    if (t.TYPES.indexOf(nodeType) < 0 && !virtualTypes[nodeType]) {
      throw new Error(messages.get("traverseVerifyNodeType", nodeType));
    }

    var visitors = visitor[nodeType];
    if (typeof visitors === "object") {
      for (var visitorKey in visitors) {
        if (visitorKey === "enter" || visitorKey === "exit") continue;
        throw new Error(messages.get("traverseVerifyVisitorProperty", nodeType, visitorKey));
      }
    }
  }

  visitor._verified = true;
}

export function merge(visitors) {
  var rootVisitor = {};

  for (var visitor of (visitors: Array)) {
    for (var type in visitor) {
      var nodeVisitor = rootVisitor[type] = rootVisitor[type] || {};
      mergePair(nodeVisitor, visitor[type]);
    }
  }

  return rootVisitor;
}

function ensureEntranceObjects(obj) {
  for (let key in obj) {
    if (shouldIgnoreKey(key)) continue;

    var fns = obj[key];
    if (typeof fns === "function") {
      obj[key] = { enter: fns };
    }
  }
}

function addQueries(visitor) {
  for (var selector in visitor.queries) {
    var fns = visitor.queries[selector];
    addSelector(visitor, selector, fns);
  }
}

function addSelector(visitor, selector, fns) {
  selector = esquery.parse(selector);

  for (var key in fns) {
    let fn = fns[key];
    fns[key] = function (node) {
      if (esquery.matches(node, selector, this.getAncestry())) {
        return fn.apply(this, arguments);
      }
    };
  }

  mergePair(visitor, fns);
}

function wrapCheck(wrapper, fn) {
  return function () {
    if (wrapper.checkPath(this)) {
      return fn.apply(this, arguments);
    }
  };
}

function shouldIgnoreKey(key) {
  // internal/hidden key
  if (key[0] === "_") return true;

  // ignore function keys
  if (key === "enter" || key === "exit" || key === "shouldSkip") return true;

  // ignore other options
  if (key === "blacklist" || key === "noScope" || key === "skipKeys") return true;

  return false;
}

function mergePair(dest, src) {
  for (var key in src) {
    dest[key] = [].concat(dest[key] || [], src[key]);
  }
}
