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

export function inType() {
  var path = this;
  while (path) {
    for (var type of (arguments: Array)) {
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
