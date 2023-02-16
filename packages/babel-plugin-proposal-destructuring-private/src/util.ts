import type * as t from "@babel/types";
import type { Scope } from "@babel/traverse";
import { types } from "@babel/core";
import type { File } from "@babel/core";
import { buildObjectExcludingKeys } from "@babel/plugin-transform-destructuring";
const {
  assignmentExpression,
  binaryExpression,
  conditionalExpression,
  cloneNode,
  isObjectProperty,
  isPrivateName,
  memberExpression,
  numericLiteral,
  objectPattern,
  restElement,
  variableDeclarator,
  variableDeclaration,
  unaryExpression,
} = types;

function buildUndefinedNode() {
  return unaryExpression("void", numericLiteral(0));
}

function transformAssignmentPattern(
  initializer: t.Expression,
  tempId: t.Identifier,
) {
  return conditionalExpression(
    binaryExpression("===", cloneNode(tempId), buildUndefinedNode()),
    initializer,
    cloneNode(tempId),
  );
}

function initRestExcludingKeys(pattern: t.LVal): ExcludingKey[] | null {
  if (pattern.type === "ObjectPattern") {
    const { properties } = pattern;
    if (properties[properties.length - 1].type === "RestElement") {
      return [];
    }
  }
  return null;
}

/**
 * grow `excludingKeys` from given properties. This routine mutates properties by
 * memoising the computed non-static keys.
 *
 * @param {ExcludingKey[]} excludingKeys
 * @param {t.ObjectProperty[]} properties An array of object properties that should be excluded by rest element transform
 * @param {Scope} scope Where should we register the memoised id
 */
function growRestExcludingKeys(
  excludingKeys: ExcludingKey[],
  properties: t.ObjectProperty[],
  scope: Scope,
) {
  if (excludingKeys === null) return;
  for (const property of properties) {
    const propertyKey = property.key;
    if (property.computed && !scope.isStatic(propertyKey)) {
      const tempId = scope.generateDeclaredUidIdentifier("m");
      // @ts-expect-error A computed property key must not be a private name
      property.key = assignmentExpression("=", tempId, propertyKey);
      excludingKeys.push({ key: tempId, computed: true });
    } else if (propertyKey.type !== "PrivateName") {
      excludingKeys.push(property);
    }
  }
}

/**
 * Prepare var declarations for params. Only param initializers
 * will be transformed to undefined coalescing, other features are preserved.
 * This function does NOT mutate given AST structures.
 *
 * @export
 * @param {Function["params"]} params An array of function params
 * @param {Scope} scope A scope used to generate uid for function params
 * @returns {{ params: Identifier[]; variableDeclaration: VariableDeclaration }} An array of new id for params
 * and variable declaration to be prepended to the function body
 */
export function buildVariableDeclarationFromParams(
  params: t.Function["params"],
  scope: Scope,
): {
  params: (t.Identifier | t.RestElement)[];
  variableDeclaration: t.VariableDeclaration;
} {
  const { elements, transformed } = buildAssignmentsFromPatternList(
    params,
    scope,
    /* isAssignment */ false,
  );
  return {
    params: elements,
    variableDeclaration: variableDeclaration(
      "var",
      transformed.map(({ left, right }) => variableDeclarator(left, right)),
    ),
  };
}

interface Transformed {
  left: Exclude<LHS, t.AssignmentPattern>;
  right: t.Expression;
}

function buildAssignmentsFromPatternList(
  elements: (t.LVal | null)[],
  scope: Scope,
  isAssignment: boolean,
): {
  elements: (t.Identifier | t.RestElement | null)[];
  transformed: Transformed[];
} {
  const newElements: (t.Identifier | t.RestElement)[] = [],
    transformed: Transformed[] = [];
  for (let element of elements) {
    if (element === null) {
      newElements.push(null);
      transformed.push(null);
      continue;
    }
    const tempId = scope.generateUidIdentifier("p");
    if (isAssignment) {
      scope.push({ id: cloneNode(tempId) });
    }
    if (element.type === "RestElement") {
      newElements.push(restElement(tempId));
      // The argument of a RestElement within a BindingPattern must be either Identifier or BindingPattern
      element = element.argument as t.Identifier | t.Pattern;
    } else {
      newElements.push(tempId);
    }
    if (element.type === "AssignmentPattern") {
      transformed.push({
        left: element.left,
        right: transformAssignmentPattern(element.right, tempId),
      });
    } else {
      transformed.push({
        left: element as Transformed["left"],
        right: cloneNode(tempId),
      });
    }
  }
  return { elements: newElements, transformed };
}

type StackItem = {
  node: t.LVal | t.ObjectProperty | null;
  index: number;
  depth: number;
};

/**
 * A DFS simplified pattern traverser. It skips computed property keys and assignment pattern
 * initializers. The following nodes will be delegated to the visitor:
 * - ArrayPattern
 * - ArrayPattern elements
 * - AssignmentPattern
 * - ObjectPattern
 * - ObjectProperty
 * - RestElement
 * @param root
 * @param visitor
 */
export function* traversePattern(
  root: t.LVal,
  visitor: (
    node: t.LVal | t.ObjectProperty,
    index: number,
    depth: number,
  ) => Generator<any, void, any>,
) {
  const stack: StackItem[] = [];
  stack.push({ node: root, index: 0, depth: 0 });
  let item: StackItem;
  while ((item = stack.pop()) !== undefined) {
    const { node, index } = item;
    if (node === null) continue;
    yield* visitor(node, index, item.depth);
    const depth = item.depth + 1;
    switch (node.type) {
      case "AssignmentPattern":
        stack.push({ node: node.left, index: 0, depth });
        break;
      case "ObjectProperty":
        // inherit the depth and index as an object property can not be an LHS without object pattern
        stack.push({ node: node.value as t.LVal, index, depth: item.depth });
        break;
      case "RestElement":
        stack.push({ node: node.argument, index: 0, depth });
        break;
      case "ObjectPattern":
        for (let list = node.properties, i = list.length - 1; i >= 0; i--) {
          stack.push({ node: list[i], index: i, depth });
        }
        break;
      case "ArrayPattern":
        for (let list = node.elements, i = list.length - 1; i >= 0; i--) {
          stack.push({ node: list[i], index: i, depth });
        }
        break;
      case "TSParameterProperty":
      case "TSAsExpression":
      case "TSTypeAssertion":
      case "TSNonNullExpression":
        throw new Error(
          `TypeScript features must first be transformed by ` +
            `@babel/plugin-transform-typescript.\n` +
            `If you have already enabled that plugin (or '@babel/preset-typescript'), make sure ` +
            `that it runs before @babel/plugin-proposal-destructuring-private.`,
        );
      default:
        break;
    }
  }
}

export function hasPrivateKeys(pattern: t.LVal) {
  let result = false;
  traversePattern(pattern, function* (node) {
    if (isObjectProperty(node) && isPrivateName(node.key)) {
      result = true;
      // stop the traversal
      yield;
    }
  }).next();
  return result;
}

export function hasPrivateClassElement(node: t.ClassBody): boolean {
  return node.body.some(element =>
    isPrivateName(
      // @ts-expect-error: for those class element without `key`, they must
      // not be a private element
      element.key,
    ),
  );
}

/**
 * Traverse the given pattern and report the private key path.
 * A private key path is analogous to an array of `key` from the pattern NodePath
 * to the private key NodePath. See also test/util.skip-bundled.js for an example output
 *
 * @export
 * @param {t.LVal} pattern
 */
export function* privateKeyPathIterator(pattern: t.LVal) {
  const indexPath: number[] = [];
  yield* traversePattern(pattern, function* (node, index, depth) {
    indexPath[depth] = index;
    if (isObjectProperty(node) && isPrivateName(node.key)) {
      // The indexPath[0, depth] contains the path from root pattern to the object property
      // with private key. The indexPath may have more than depth + 1 elements because we
      // don't shrink the indexPath when the traverser returns to parent nodes.
      yield indexPath.slice(1, depth + 1);
    }
  });
}

type LHS = Exclude<t.LVal, t.RestElement | t.TSParameterProperty>;

type ExcludingKey = {
  key: t.ObjectProperty["key"];
  computed: t.ObjectProperty["computed"];
};
type Item = {
  left: LHS;
  right: t.Expression;
  restExcludingKeys?: ExcludingKey[] | null;
};

function rightWillBeReferencedOnce(left: LHS) {
  switch (left.type) {
    // Skip memoising the right when left is an identifier or
    // an array pattern
    case "Identifier":
    case "ArrayPattern":
      return true;
    case "ObjectPattern":
      return left.properties.length === 1;
    default:
      return false;
  }
}
/**
 * Transform private destructuring. It returns a generator
 * which yields a pair of transformed LHS and RHS, which can form VariableDeclaration or
 * AssignmentExpression later.
 *
 * @export
 * @param {LHS} left The root pattern
 * @param {t.Expression} right The initializer or the RHS of pattern
 * @param {Scope} scope The scope where memoized id should be registered
 * @param {boolean} isAssignment Whether we are transforming from an AssignmentExpression of VariableDeclaration
 * @returns {Generator<Transformed, void, void>}
 */
export function* transformPrivateKeyDestructuring(
  left: LHS,
  right: t.Expression,
  scope: Scope,
  isAssignment: boolean,
  shouldPreserveCompletion: boolean,
  addHelper: File["addHelper"],
  objectRestNoSymbols: boolean,
  useBuiltIns: boolean,
): Generator<Transformed, void, void> {
  const stack: Item[] = [];
  const rootRight = right;
  // The stack holds patterns that we don't known whether they contain private key
  stack.push({
    left,
    right,
    restExcludingKeys: initRestExcludingKeys(left),
  });
  let item: Item;
  while ((item = stack.pop()) !== undefined) {
    const { restExcludingKeys } = item;
    let { left, right } = item;
    const searchPrivateKey = privateKeyPathIterator(left).next();
    if (searchPrivateKey.done) {
      if (restExcludingKeys?.length > 0) {
        // optimize out the rest element because `objectWithoutProperties`
        // returns a new object
        // `{ ...z } = babelHelpers.objectWithoutProperties(m, ["x"])`
        // to
        // `z = babelHelpers.objectWithoutProperties(m, ["x"])`
        const { properties } = left as t.ObjectPattern;
        if (properties.length === 1) {
          // The argument of an object rest element must be an Identifier
          left = (properties[0] as t.RestElement).argument as t.Identifier;
        }
        yield {
          left: left as t.ObjectPattern,
          right: buildObjectExcludingKeys(
            restExcludingKeys,
            right,
            scope,
            addHelper,
            objectRestNoSymbols,
            useBuiltIns,
          ),
        };
      } else {
        yield {
          left:
            // An assignment pattern will not be pushed to the stack
            left as Transformed["left"],
          right,
        };
      }
    } else {
      // now we need to split according to the indexPath;
      const indexPath = searchPrivateKey.value;
      for (
        let indexPathIndex = 0, index;
        (indexPathIndex < indexPath.length &&
          (index = indexPath[indexPathIndex]) !== undefined) ||
        left.type === "AssignmentPattern";
        indexPathIndex++
      ) {
        const isRightSafeToReuse =
          // If we should preserve completion and the right is the rootRight, then the
          // right is NOT safe to reuse because we will insert a new memoising statement
          // in the AssignmentExpression visitor, which causes right to be referenced more
          // than once
          !(shouldPreserveCompletion && right === rootRight) &&
          (rightWillBeReferencedOnce(left) || scope.isStatic(right));
        if (!isRightSafeToReuse) {
          const tempId = scope.generateUidIdentifier("m");
          if (isAssignment) {
            scope.push({ id: cloneNode(tempId) });
          }
          yield { left: tempId, right };
          right = cloneNode(tempId);
        }
        // invariant: at this point right must be a static identifier;
        switch (left.type) {
          case "ObjectPattern": {
            const { properties } = left;
            if (index > 0) {
              // properties[0, index) must not contain private keys
              const propertiesSlice = properties.slice(0, index);
              yield {
                left: objectPattern(propertiesSlice),
                right: cloneNode(right),
              };
            }
            if (index < properties.length - 1) {
              // for properties after `index`, push them to stack so we can process them later
              // inherit the restExcludingKeys on the stack if we are at
              // the first level, otherwise initialize a new restExcludingKeys
              const nextRestExcludingKeys =
                indexPathIndex === 0
                  ? restExcludingKeys
                  : initRestExcludingKeys(left);
              growRestExcludingKeys(
                nextRestExcludingKeys,
                // @ts-expect-error properties[0, index] must not contain rest element
                // because properties[index] contains a private key
                properties.slice(0, index + 1),
                scope,
              );
              stack.push({
                left: objectPattern(properties.slice(index + 1)),
                right: cloneNode(right),
                restExcludingKeys: nextRestExcludingKeys,
              });
            }
            // An object rest element must not contain a private key
            const property = properties[index] as t.ObjectProperty;
            // The value of ObjectProperty under ObjectPattern must be an LHS
            left = property.value as LHS;
            const { key } = property;
            const computed =
              property.computed ||
              // `{ 0: x } = RHS` is transformed to a computed member expression `x = RHS[0]`
              (key.type !== "Identifier" && key.type !== "PrivateName");
            right = memberExpression(right, key, computed);
            break;
          }
          case "AssignmentPattern": {
            right = transformAssignmentPattern(
              left.right,
              right as t.Identifier,
            );
            left = left.left;
            break;
          }
          case "ArrayPattern": {
            // todo: the transform here assumes that any expression within
            // the array pattern, when evaluated, do not interfere with the iterable
            // in RHS. Otherwise we have to pause the iterable and interleave
            // the expressions.
            // See also https://gist.github.com/nicolo-ribaudo/f8ac7916f89450f2ead77d99855b2098
            // and ordering/array-pattern-side-effect-iterable test
            const leftElements = left.elements;
            const leftElementsAfterIndex = leftElements.splice(index);
            const { elements, transformed } = buildAssignmentsFromPatternList(
              leftElementsAfterIndex,
              scope,
              isAssignment,
            );
            leftElements.push(...elements);
            yield { left, right: cloneNode(right) };
            // for elements after `index`, push them to stack so we can process them later
            for (let i = transformed.length - 1; i > 0; i--) {
              // skipping array holes
              if (transformed[i] !== null) {
                stack.push(transformed[i]);
              }
            }
            ({ left, right } = transformed[0]);
            break;
          }
          default:
            break;
        }
      }
      stack.push({
        left,
        right,
        restExcludingKeys: initRestExcludingKeys(left),
      });
    }
  }
}
