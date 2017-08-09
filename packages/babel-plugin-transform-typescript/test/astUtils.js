const babelTypes = require("babel-types");

/**
 * @param {object} ast
 * @return {void}
 */
exports.logAst = function logAst(ast) {
  console.log(JSON.stringify(simplify(ast), undefined, 2));
};

/**
 * @param {object} ast1
 * @param {object} ast2
 * @param {string} msg
 * @return {void}
 */
exports.compareAsts = function compareAsts(ast1, ast2, msg) {
  ast1 = simplify(ast1);
  ast2 = simplify(ast2);
  const mis = misMatch(ast1, ast2);
  if (mis) {
    console.error(msg);
    throw new Error(mis);
  }
};

/**
 * Recursively validate every node in the tree.
 * @param {object} ast
 * @return {void}
 */
exports.validate = function validate(ast) {
  deepValidate(simplify(ast));
};

/**
 * @param {string} key
 * @param {object} node
 */
function allowExtraKey(key, node) {
  switch (key) {
    case "type":
    case "__clone":
    case "extra":
      return true;

    case "generator":
      // https://github.com/babel/babylon/issues/505
      return node.type === "ArrowFunctionExpression";

    case "expression":
      switch (node.type) {
        case "ClassMethod":
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "ArrowFunctionExpression":
        case "ObjectMethod":
        case "TSDeclareFunction":
        case "TSDeclareMethod":
          return true;
        default:
          return false;
      }

    case "method":
      return node.type === "ObjectProperty" || node.type === "ObjectMethod";

    case "guardedHandlers":
      return node.type === "TryStatement";
  }
}

/**
 * @param {object} node
 * @return {void}
 */
function deepValidate(node) {
  const fields = babelTypes.NODE_FIELDS[node.type];
  if (fields === undefined) {
    throw new Error(`Can't find fields for ${node.type}`);
  }

  for (const key in node) {
    if (!(key in fields) && !allowExtraKey(key, node)) {
      throw new Error(`Extra key '${key}' not in fields of ${node.type}`);
    }
  }

  for (const fieldName in fields) {
    const field = fields[fieldName];
    const value = node[fieldName];
    if (field.optional && value == null) {
      continue;
    }
    const validate = field.validate;
    if (!validate) {
      if (shouldIgnoreField(fieldName)) {
        continue;
      }
      // babel-types has a TODO for this
      if (fieldName === "value" && node.type === "TemplateElement") {
        continue;
      }
      throw new Error(`No validator for '${fieldName}' of ${node.type}`);
    }

    try {
      validate(node, fieldName, value);
      if (Array.isArray(value)) {
        for (const v of value) {
          if (v.type) {
            deepValidate(v);
          }
        }
      } else if (value.type) {
        deepValidate(value);
      }
    } catch (e) {
      e.message = `At ${node.type}.${fieldName}: ${e.message}`;
      throw e;
    }
  }
}

/**
 * @param {object} ast
 * @return {object}
 */
function simplify(ast) {
  if (ast === null || typeof ast !== "object") return ast;
  if (Array.isArray(ast)) return ast.map(simplify);

  const res = {};

  let allGone = true;

  for (const key in ast) {
    if (shouldIgnoreField(key)) {
      continue;
    }

    const x = simplify(ast[key]);
    if (x != null) {
      res[key] = x;
      allGone = false;
    }
  }

  return allGone ? undefined : res;
}

// Ignore properties of an AST that may be allowed to differ.
/**
 * @param {string} prop
 * @return {boolean}
 */
function shouldIgnoreField(prop) {
  switch (prop) {
    //case "extra":
    case "loc":
    case "end":
    case "start":
    case "tokens":
    case "comments":
    case "innerComments":
    case "leadingComments":
    case "trailingComments":
    // babel-generator may remove parentheses it deems unnecessary.
    // e.g. `(1).toFixed()` becomes `1 .toFixed()`
    case "parenthesized":
    case "parenthesizedArgument":
    case "parenStart":
    // These are present for parsed string literals, but not for generated ones.
    case "rawValue":
    case "raw":
      return true;
    default:
      return false;
  }
}

function ppJSON(v) {
  v = v instanceof RegExp ? v.toString() : v;
  return JSON.stringify(v, null, 2);
}

function addPath(str, pt) {
  if (str.charAt(str.length - 1) == ")") {
    return str.slice(0, str.length - 1) + "/" + pt + ")";
  } else {
    return str + " (" + pt + ")";
  }
}

function misMatch(exp, act) {
  if (exp instanceof RegExp || act instanceof RegExp) {
    const left = ppJSON(exp),
      right = ppJSON(act);
    if (left !== right) return left + " !== " + right;
  } else if (Array.isArray(exp)) {
    if (!Array.isArray(act)) return ppJSON(exp) + " != " + ppJSON(act);
    if (act.length != exp.length) {
      return "array length mismatch " + exp.length + " != " + act.length;
    }
    for (let i = 0; i < act.length; ++i) {
      const mis = misMatch(exp[i], act[i]);
      if (mis) {
        return addPath(mis, i);
      }
    }
  } else if (!exp || !act || typeof exp != "object" || typeof act != "object") {
    if (exp !== act && typeof exp !== "function") {
      return ppJSON(exp) + " !== " + ppJSON(act);
    }
  } else {
    for (const prop in exp) {
      const mis = misMatch(exp[prop], act[prop]);
      if (mis) return addPath(mis, prop);
    }

    for (const prop in act) {
      if (shouldIgnoreField(prop) || prop === "__clone") {
        continue;
      }

      if (!(prop in exp) && act[prop] !== undefined) {
        // Treat null and 'false' the same.
        if (act[prop] !== false) {
          return `Did not expect a property '${prop}'`;
        }
      }
    }
  }
}
