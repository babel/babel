/**
 * Description
 */

export function findParent(callback) {
  var path = this;
  while (path) {
    if (callback(path)) return path;
    path = path.parentPath;
  }
  return null;
}

/**
 * Description
 */

export function getStatementParent() {
  var path = this;
  do {
    if (Array.isArray(path.container)) {
      return path;
    }
  } while(path = path.parentPath);
}

/**
 * Description
 */

export function getAncestry() {
  var ancestry = [];

  var path = this.parentPath;
  while (path) {
    ancestry.push(path.node);
    path = path.parentPath;
  }

  return ancestry;
}

/**
 * Description
 */

export function inType(types) {
  if (!Array.isArray(types)) types = [types];

  var path = this;
  while (path) {
    for (var type of (types: Array)) {
      if (path.node.type === type) return true;
    }
    path = path.parentPath;
  }

  return false;
}

/**
 * Description
 */

export function inShadow(key) {
  var path = this;
  var dontShadow = path.node._shadowedFunctionLiteral;
  if (dontShadow !== undefined) {
    return !dontShadow;
  }
  while (path) {
    if (path.isFunction()) {
      var { shadow } = path.node;
      if (shadow && (shadow === true || shadow[key] !== false)) {
        return path;
      } else {
        return null;
      }
    }
    path = path.parentPath;
  }
  return null;
}
