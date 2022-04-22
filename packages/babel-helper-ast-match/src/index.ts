const { isArray } = Array;

function isObject(value) {
  return value != null && typeof value === "object";
}

const matcher = Symbol("matcher");

class AnyOf {
  values: Array<unknown>;

  constructor(values) {
    this.values = values;
  }

  [matcher](ast) {
    return this.values.findIndex(value => astMatch(ast, value)) >= 0;
  }
}

class Includes {
  value: unknown;

  constructor(value) {
    this.value = value;
  }

  [matcher](ast) {
    return (
      isArray(ast) &&
      ast.findIndex(astItem => astMatch(astItem, this.value)) >= 0
    );
  }
}

class None {
  [matcher](ast) {
    return ast === undefined;
  }
}

export const matchers = {
  includes: value => new Includes(value),
  anyOf: (...values) => new AnyOf(values),
  none: new None(),
};

export default function astMatch(ast, value) {
  if (typeof value[matcher] === "function") {
    return value[matcher](ast);
  } else if (isArray(value)) {
    return (
      isArray(ast) &&
      value.length === ast.length &&
      value.every((_, i) => astMatch(ast[i], value[i]))
    );
  } else if (isObject(value)) {
    return (
      isObject(ast) &&
      Object.keys(value).every(key => astMatch(ast[key], value[key]))
    );
  } else {
    return ast === value;
  }
}
