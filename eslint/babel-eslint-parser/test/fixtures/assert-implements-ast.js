// Checks if the source ast implements the target ast. Ignores extra keys on source ast
module.exports = function assertImplementsAST(target, source, path) {
  if (!path) {
    path = [];
  }

  function error(text) {
    var err = new Error(`At ${path.join(".")}: ${text}:`);
    err.depth = path.length + 1;
    throw err;
  }

  var typeA = target === null ? "null" : typeof target;
  var typeB = source === null ? "null" : typeof source;
  if (typeA !== typeB) {
    error(
      `have different types (${typeA} !== ${typeB}) (${target} !== ${source})`
    );
  } else if (
    typeA === "object" &&
    ["RegExp"].indexOf(target.constructor.name) !== -1 &&
    target.constructor.name !== source.constructor.name
  ) {
    error(
      `object have different constructors (${target.constructor
        .name} !== ${source.constructor.name}`
    );
  } else if (typeA === "object") {
    var keysTarget = Object.keys(target);
    for (var i in keysTarget) {
      var key = keysTarget[i];
      path.push(key);
      assertImplementsAST(target[key], source[key], path);
      path.pop();
    }
  } else if (target !== source) {
    error(
      `are different (${JSON.stringify(target)} !== ${JSON.stringify(source)})`
    );
  }
};
