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

export function inShadow() {
  var path = this;
  while (path) {
    if (path.isFunction()) {
      if (path.node.shadow) {
        return path;
      } else {
        return null;
      }
    }
    path = path.parentPath;
  }
  return null;
}
