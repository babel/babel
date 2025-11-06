import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
import type { PluginPass, NodePath, Scope } from "@babel/core";
import { convertFunctionParams } from "@babel/plugin-transform-parameters";
import { isRequired } from "@babel/helper-compilation-targets";
import shouldStoreRHSInTemporaryVariable from "./shouldStoreRHSInTemporaryVariable.ts";
import compatData from "./compat-data.ts";
import { unshiftForXStatementBody } from "@babel/plugin-transform-destructuring";

// @babel/types <=7.3.3 counts FOO as referenced in var { x: FOO }.
// We need to detect this bug to know if "unused" means 0 or 1 references.
if (!process.env.BABEL_8_BREAKING) {
  const node = t.identifier("a");
  const property = t.objectProperty(t.identifier("key"), node);
  const pattern = t.objectPattern([property]);

  // eslint-disable-next-line no-var
  var ZERO_REFS = t.isReferenced(node, property, pattern) ? 1 : 0;
}

export interface Options {
  useBuiltIns?: boolean;
  loose?: boolean;
}

export default declare((api, opts: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const targets = api.targets();
  const supportsObjectAssign = !isRequired("Object.assign", targets, {
    compatData,
  });

  const { useBuiltIns = supportsObjectAssign, loose = false } = opts;

  if (typeof loose !== "boolean") {
    throw new Error(".loose must be a boolean, or undefined");
  }

  const ignoreFunctionLength = api.assumption("ignoreFunctionLength") ?? loose;
  const objectRestNoSymbols = api.assumption("objectRestNoSymbols") ?? loose;
  const pureGetters = api.assumption("pureGetters") ?? loose;
  const setSpreadProperties = api.assumption("setSpreadProperties") ?? loose;

  function getExtendsHelper(
    file: PluginPass,
  ): t.MemberExpression | t.Identifier {
    return useBuiltIns
      ? t.memberExpression(t.identifier("Object"), t.identifier("assign"))
      : file.addHelper("extends");
  }

  function* iterateObjectRestElement(
    path: NodePath<t.LVal | t.PatternLike | t.TSParameterProperty>,
  ): Generator<NodePath<t.RestElement>> {
    switch (path.type) {
      case "ArrayPattern":
        for (const elementPath of path.get("elements")) {
          if (elementPath.isRestElement()) {
            yield* iterateObjectRestElement(elementPath.get("argument"));
          } else {
            yield* iterateObjectRestElement(elementPath);
          }
        }
        break;
      case "ObjectPattern":
        for (const propertyPath of path.get("properties")) {
          if (propertyPath.isRestElement()) {
            yield propertyPath;
          } else {
            yield* iterateObjectRestElement(
              propertyPath.get("value") as NodePath<t.Pattern>,
            );
          }
        }
        break;
      case "AssignmentPattern":
        yield* iterateObjectRestElement(path.get("left"));
        break;
      default:
        break;
    }
  }

  function hasObjectRestElement(
    path: NodePath<t.LVal | t.PatternLike | t.TSParameterProperty>,
  ): boolean {
    const objectRestPatternIterator = iterateObjectRestElement(path);
    return !objectRestPatternIterator.next().done;
  }

  function visitObjectRestElements(
    path: NodePath<t.LVal | t.PatternLike>,
    visitor: (path: NodePath<t.RestElement>) => void,
  ) {
    for (const restElementPath of iterateObjectRestElement(path)) {
      visitor(restElementPath);
    }
  }

  function hasSpread(node: t.ObjectExpression): boolean {
    for (const prop of node.properties) {
      if (t.isSpreadElement(prop)) {
        return true;
      }
    }
    return false;
  }

  // returns an array of all keys of an object, and a status flag indicating if all extracted keys
  // were converted to stringLiterals or not
  // e.g. extracts {keys: ["a", "b", "3", ++x], allPrimitives: false }
  // from ast of {a: "foo", b, 3: "bar", [++x]: "baz"}
  // `allPrimitives: false` doesn't necessarily mean that there is a non-primitive, but just
  // that we are not sure.
  function extractNormalizedKeys(
    pattern: t.ObjectPattern | NodePath<t.ObjectPattern>,
  ) {
    // RestElement has been removed in createObjectRest
    // If we have a NodePath, get the current nodes (which reflect any transformations)
    const isPath = "get" in pattern;
    const propsList: t.ObjectProperty[] = isPath
      ? pattern
          .get("properties")
          .map((p: NodePath) => p.node as t.ObjectProperty)
      : (pattern.properties as t.ObjectProperty[]);

    const keys: t.Expression[] = [];
    let allPrimitives = true;
    let hasTemplateLiteral = false;

    for (const prop of propsList) {
      const key = prop.key;
      if (t.isIdentifier(key) && !prop.computed) {
        // since a key {a: 3} is equivalent to {"a": 3}, use the latter
        keys.push(t.stringLiteral(key.name));
      } else if (t.isTemplateLiteral(key)) {
        keys.push(t.cloneNode(key));
        hasTemplateLiteral = true;
      } else if (t.isLiteral(key)) {
        keys.push(
          t.stringLiteral(
            String(
              // @ts-expect-error prop.key can not be a NullLiteral
              key.value,
            ),
          ),
        );
      } else {
        // If the key is an inline memoization assignment (e.g. _key = expr),
        // use just the identifier part for the exclusion array
        if (t.isAssignmentExpression(key) && t.isIdentifier(key.left)) {
          // For inline memoized keys, use just the left side (the identifier)
          // to avoid evaluating the assignment expression multiple times
          keys.push(t.cloneNode(key.left));
        } else {
          // @ts-expect-error private name has been handled by destructuring-private
          keys.push(t.cloneNode(key));
        }

        // Check the original key for primitiveness
        const keyToCheck = t.isAssignmentExpression(key) ? key.right : key;
        if (
          (t.isMemberExpression(keyToCheck, { computed: false }) &&
            t.isIdentifier(keyToCheck.object, { name: "Symbol" })) ||
          (t.isCallExpression(keyToCheck) &&
            t.matchesPattern(keyToCheck.callee, "Symbol.for"))
        ) {
          // there all return a primitive
        } else {
          allPrimitives = false;
        }
      }
    }

    return { keys, allPrimitives, hasTemplateLiteral };
  }

  /**
   * Replaces computed keys that have side effects with inline memoization.
   *
   * Example: { [foo()]: x } becomes { [_temp = foo()]: x } with upfront declaration: var _temp;
   *
   * This function is called in multiple places during transformation. To avoid creating
   * duplicate temp variables, we skip properties that were already memoized inline
   * (marked with _keyAlreadyHoisted flag).
   */
  function replaceImpureComputedKeys(
    properties: NodePath<t.ObjectProperty>[],
    scope: Scope,
  ) {
    const tempVariableDeclarations: t.VariableDeclarator[] = [];

    for (const property of properties) {
      // PrivateName is handled in destructuring-private plugin
      const keyExpression = property.get("key") as NodePath<t.Expression>;

      // Skip if already memoized inline in the VariableDeclarator visitor
      // (This prevents creating duplicate temp variables like _a2 = _a)
      if ((property.node as any)._keyAlreadyHoisted) {
        continue;
      }

      // Skip if already memoised (inline assignment expression with a UID)
      // This happens when inline memoization is used for nested object rest
      if (
        keyExpression.isAssignmentExpression() &&
        keyExpression.get("left").isIdentifier()
      ) {
        const identName = (keyExpression.node.left as t.Identifier).name;
        // Check current scope and parent scopes for the UID
        let currentScope: Scope | null = scope;
        let isUid = false;
        while (currentScope) {
          if (currentScope.hasUid(identName)) {
            isUid = true;
            break;
          }
          currentScope = currentScope.parent;
        }
        if (isUid) {
          continue;
        }
      }

      // Only process computed keys that have side effects (function calls, mutations, etc.)
      if (property.node.computed && !keyExpression.isPure()) {
        const tempVariableName = scope.generateUidBasedOnNode(
          keyExpression.node,
        );
        const tempVariableDeclaration = t.variableDeclarator(
          t.identifier(tempVariableName),
          keyExpression.node,
        );
        tempVariableDeclarations.push(tempVariableDeclaration);
        keyExpression.replaceWith(t.identifier(tempVariableName));
      }
    }

    return tempVariableDeclarations;
  }

  function removeUnusedExcludedKeys(path: NodePath<t.ObjectPattern>): void {
    const bindings = path.getOuterBindingIdentifierPaths();

    Object.keys(bindings).forEach(bindingName => {
      const bindingParentPath = bindings[bindingName].parentPath;
      if (
        path.scope.getBinding(bindingName).references >
          (process.env.BABEL_8_BREAKING ? 0 : ZERO_REFS) ||
        !bindingParentPath.isObjectProperty()
      ) {
        return;
      }
      bindingParentPath.remove();
    });
  }

  /**
   * Finds all computed property keys in a destructuring pattern,
   * in the order they appear in the source code.
   *
   * Example: const { [a()]: { [b()]: x, ...rest }, [c()]: y } = obj
   * Returns: [a(), b(), c()] in that order
   *
   * This is needed because when nested patterns have rest elements (...rest),
   * the transformation splits them up, but need to ensure a(), b(), c()
   * are always evaluated in this exact order (left-to-right as written).
   */
  function collectComputedKeysInSourceOrder(
    destructuringPattern: NodePath<t.ObjectPattern>,
  ): NodePath<t.ObjectProperty>[] {
    const computedProperties: NodePath<t.ObjectProperty>[] = [];

    function visitPattern(pattern: NodePath<t.PatternLike | t.LVal>) {
      if (pattern.isObjectPattern()) {
        const properties = pattern.get("properties") as NodePath<
          t.ObjectProperty | t.RestElement
        >[];
        for (const property of properties) {
          if (property.isRestElement()) continue;

          // If this property has a computed key like [someExpression], collect it
          if (property.node.computed) {
            computedProperties.push(property);
          }

          // Then look inside the property's value for more nested patterns
          const nestedPattern = property.get(
            "value",
          ) as NodePath<t.PatternLike>;
          visitPattern(nestedPattern as NodePath<t.PatternLike | t.LVal>);
        }
      } else if (pattern.isArrayPattern()) {
        for (const element of pattern.get("elements")) {
          if (!element) continue;
          if (element.isRestElement()) {
            const restArgument = element.get("argument") as NodePath<
              t.PatternLike | t.LVal
            >;
            visitPattern(restArgument);
          } else {
            visitPattern(element as NodePath<t.PatternLike | t.LVal>);
          }
        }
      } else if (pattern.isAssignmentPattern()) {
        visitPattern(pattern.get("left") as NodePath<t.PatternLike | t.LVal>);
      }
    }

    visitPattern(
      destructuringPattern as unknown as NodePath<t.PatternLike | t.LVal>,
    );
    return computedProperties;
  }

  //expects path to an object pattern
  function createObjectRest(
    path: NodePath<t.ObjectPattern>,
    file: PluginPass,
    objRef: t.Identifier | t.MemberExpression,
  ): [
    t.VariableDeclarator[],
    t.AssignmentExpression["left"],
    t.CallExpression,
  ] {
    const props = path.get("properties");
    const last = props[props.length - 1];
    t.assertRestElement(last.node);
    const restElement = t.cloneNode(last.node);
    last.remove();

    const impureComputedPropertyDeclarators = replaceImpureComputedKeys(
      path.get("properties") as NodePath<t.ObjectProperty>[],
      path.scope,
    );
    const { keys, allPrimitives, hasTemplateLiteral } =
      extractNormalizedKeys(path);

    if (keys.length === 0) {
      return [
        impureComputedPropertyDeclarators,
        restElement.argument,
        t.callExpression(getExtendsHelper(file), [
          t.objectExpression([]),
          t.sequenceExpression([
            t.callExpression(file.addHelper("objectDestructuringEmpty"), [
              t.cloneNode(objRef),
            ]),
            t.cloneNode(objRef),
          ]),
        ]),
      ];
    }

    let keyExpression;
    if (!allPrimitives) {
      // map to toPropertyKey to handle the possible non-string values
      keyExpression = t.callExpression(
        t.memberExpression(t.arrayExpression(keys), t.identifier("map")),
        [file.addHelper("toPropertyKey")],
      );
    } else {
      keyExpression = t.arrayExpression(keys);

      if (!hasTemplateLiteral && !t.isProgram(path.scope.block)) {
        // Hoist definition of excluded keys, so that it's not created each time.
        const program = path.findParent(path => path.isProgram());
        const id = path.scope.generateUidIdentifier("excluded");

        program.scope.push({
          id,
          init: keyExpression,
          kind: "const",
        });

        keyExpression = t.cloneNode(id);
      }
    }

    return [
      impureComputedPropertyDeclarators,
      restElement.argument,
      t.callExpression(
        file.addHelper(
          `objectWithoutProperties${objectRestNoSymbols ? "Loose" : ""}`,
        ),
        [t.cloneNode(objRef), keyExpression],
      ),
    ];
  }

  function replaceRestElement(
    parentPath: NodePath<t.Function | t.CatchClause>,
    paramPath: NodePath<
      t.Function["params"][number] | t.AssignmentPattern["left"]
    >,
    container?: t.VariableDeclaration[],
  ): void {
    if (paramPath.isAssignmentPattern()) {
      replaceRestElement(parentPath, paramPath.get("left"), container);
      return;
    }

    if (paramPath.isArrayPattern() && hasObjectRestElement(paramPath)) {
      const elements = paramPath.get("elements");

      for (let i = 0; i < elements.length; i++) {
        replaceRestElement(parentPath, elements[i], container);
      }
    }

    if (paramPath.isObjectPattern() && hasObjectRestElement(paramPath)) {
      const uid = parentPath.scope.generateUidIdentifier("ref");

      const declar = t.variableDeclaration("let", [
        t.variableDeclarator(paramPath.node, uid),
      ]);

      if (container) {
        container.push(declar);
      } else {
        parentPath.ensureBlock();
        (parentPath.get("body") as NodePath<t.BlockStatement>).unshiftContainer(
          "body",
          declar,
        );
      }
      paramPath.replaceWith(t.cloneNode(uid));
    }
  }

  return {
    name: "transform-object-rest-spread",
    manipulateOptions: process.env.BABEL_8_BREAKING
      ? undefined
      : (_, parser) => parser.plugins.push("objectRestSpread"),

    visitor: {
      // function a({ b, ...c }) {}
      Function(path) {
        const params = path.get("params");
        const paramsWithRestElement = new Set<number>();
        const idsInRestParams = new Set();
        for (let i = 0; i < params.length; ++i) {
          const param = params[i];
          if (hasObjectRestElement(param)) {
            paramsWithRestElement.add(i);
            for (const name of Object.keys(param.getBindingIdentifiers())) {
              idsInRestParams.add(name);
            }
          }
        }

        // if true, a parameter exists that has an id in its initializer
        // that is also an id bound in a rest parameter
        // example: f({...R}, a = R)
        let idInRest = false;

        const IdentifierHandler = function (
          path: NodePath<t.Identifier>,
          functionScope: Scope,
        ) {
          const name = path.node.name;
          if (
            path.scope.getBinding(name) === functionScope.getBinding(name) &&
            idsInRestParams.has(name)
          ) {
            idInRest = true;
            path.stop();
          }
        };

        let i: number;
        for (i = 0; i < params.length && !idInRest; ++i) {
          const param = params[i];
          if (!paramsWithRestElement.has(i)) {
            if (param.isReferencedIdentifier() || param.isBindingIdentifier()) {
              IdentifierHandler(param, path.scope);
            } else {
              param.traverse(
                {
                  "Scope|TypeAnnotation|TSTypeAnnotation": path => path.skip(),
                  "ReferencedIdentifier|BindingIdentifier": IdentifierHandler,
                },
                path.scope,
              );
            }
          }
        }

        if (!idInRest) {
          for (let i = 0; i < params.length; ++i) {
            const param = params[i];
            if (paramsWithRestElement.has(i)) {
              replaceRestElement(path, param);
            }
          }
        } else {
          const shouldTransformParam = (idx: number) =>
            idx >= i - 1 || paramsWithRestElement.has(idx);
          convertFunctionParams(
            path,
            ignoreFunctionLength,
            shouldTransformParam,
            replaceRestElement,
          );
        }
      },

      // adapted from transform-destructuring/src/index.js#pushObjectRest
      // const { a, ...b } = c;
      VariableDeclarator(path, file) {
        if (!path.get("id").isObjectPattern()) {
          return;
        }

        let insertionPath = path;
        const originalPath = path;

        visitObjectRestElements(path.get("id"), path => {
          if (
            // skip single-property case, e.g.
            // const { ...x } = foo();
            // since the RHS will not be duplicated
            shouldStoreRHSInTemporaryVariable(originalPath.node.id) &&
            !t.isIdentifier(originalPath.node.init)
          ) {
            // const { a, ...b } = foo();
            // to avoid calling foo() twice, as a first step convert it to:
            // const _foo = foo(),
            //       { a, ...b } = _foo;
            const initRef = path.scope.generateUidIdentifierBasedOnNode(
              originalPath.node.init,
              "ref",
            );
            // insert _foo = foo()
            originalPath.insertBefore(
              t.variableDeclarator(initRef, originalPath.node.init),
            );
            // replace foo() with _foo
            originalPath.replaceWith(
              t.variableDeclarator(originalPath.node.id, t.cloneNode(initRef)),
            );

            return;
          }

          /**
           * Fix for: https://github.com/babel/babel/issues/17274
           *
           * Problem: When you have nested destructuring with computed keys and rest elements:
           *   const { [log(0)]: { [log(1)]: x, ...rest }, [log(2)]: y } = obj
           *
           * The functions log(0), log(1), log(2) must be called in that exact order.
           * But without this fix, the nested pattern gets processed first, causing the wrong order.
           *
           * Additionally, with default values:
           *   const { [log(0)]: x = log(1), [log(2)]: y } = obj
           *
           * The order must be: log(0), then log(1) (if x is undefined), then log(2).
           *
           * Solution: Use inline memoization with assignment expressions.
           * Transform:
           *   const { [log(0)]: { [log(1)]: x, ...rest }, [log(2)]: y } = obj
           * Into:
           *   var _log, _log2, _log3;
           *   const { [_log = log(0)]: { [_log2 = log(1)]: x, ...rest }, [_log3 = log(2)]: y } = obj
           *
           * This preserves correct evaluation order even with default values.
           */

          // Only do this once per variable declaration (even if multiple rest elements exist)
          const alreadyMemoisedComputedKeys = originalPath.getData(
            "computedKeysAlreadyMemoised",
          );
          if (!alreadyMemoisedComputedKeys) {
            originalPath.setData("computedKeysAlreadyMemoised", true);

            // Find all computed keys (like [someExpression]) in left-to-right order
            const destructuringPattern = originalPath.get(
              "id",
            ) as NodePath<t.ObjectPattern>;
            const propertiesWithComputedKeys =
              collectComputedKeysInSourceOrder(destructuringPattern);

            // For each computed key that has side effects (not a simple variable)
            for (const property of propertiesWithComputedKeys) {
              const computedKeyExpression = property.get(
                "key",
              ) as NodePath<t.Expression>;

              // Skip if already memoised (assignment expression with a UID)
              if (
                computedKeyExpression.isAssignmentExpression() &&
                computedKeyExpression.get("left").isIdentifier() &&
                originalPath.scope.hasUid(
                  (computedKeyExpression.node.left as t.Identifier).name,
                )
              ) {
                continue;
              }

              // Check if the expression has side effects (function call, ++x, etc.)
              if (!computedKeyExpression.isPure()) {
                // Create a temporary variable identifier
                const tempVariableName =
                  originalPath.scope.generateUidBasedOnNode(
                    computedKeyExpression.node,
                  );
                const tempIdentifier = t.identifier(tempVariableName);

                // Declare the variable upfront with no initializer (var declaration)
                originalPath.scope.push({
                  id: tempIdentifier,
                  kind: "var",
                });

                // Replace [log(0)] with [_key = log(0)] for inline memoization
                computedKeyExpression.replaceWith(
                  t.assignmentExpression(
                    "=",
                    t.cloneNode(tempIdentifier),
                    computedKeyExpression.node,
                  ),
                );

                // Mark this property so we don't process it again later
                (property.node as any)._keyAlreadyHoisted = true;
              }
            }
          }

          let ref = originalPath.node.init;
          const refPropertyPath: NodePath<t.ObjectProperty>[] = [];
          let kind;

          path.findParent((path: NodePath): boolean => {
            if (path.isObjectProperty()) {
              refPropertyPath.unshift(path);
            } else if (path.isVariableDeclarator()) {
              kind = path.parentPath.node.kind;
              return true;
            }
          });

          const impureObjRefComputedDeclarators = replaceImpureComputedKeys(
            refPropertyPath,
            path.scope,
          );
          refPropertyPath.forEach(prop => {
            // Get the current key (which may have been transformed to an inline assignment)
            const keyPath = prop.get("key") as NodePath<t.Expression>;
            let keyForMemberExpression: t.Expression = keyPath.node;

            // If the key is an inline memoization assignment, use just the identifier
            if (t.isAssignmentExpression(keyPath.node)) {
              // For inline memoized keys, extract just the left side (the identifier)
              // to avoid re-evaluating the assignment expression
              keyForMemberExpression = keyPath.node.left as t.Expression;
            }

            ref = t.memberExpression(
              ref,
              t.cloneNode(keyForMemberExpression),
              prop.node.computed || t.isLiteral(keyPath.node),
            );
          });

          const objectPatternPath =
            path.parentPath as NodePath<t.ObjectPattern>;

          const [impureComputedPropertyDeclarators, argument, callExpression] =
            createObjectRest(
              objectPatternPath,
              file,
              ref as t.MemberExpression,
            );

          if (pureGetters) {
            removeUnusedExcludedKeys(objectPatternPath);
          }

          t.assertIdentifier(argument);

          insertionPath.insertBefore(impureComputedPropertyDeclarators);

          insertionPath.insertBefore(impureObjRefComputedDeclarators);

          insertionPath = insertionPath.insertAfter(
            t.variableDeclarator(argument, callExpression),
          )[0];

          path.scope.registerBinding(kind, insertionPath);

          if (objectPatternPath.node.properties.length === 0) {
            objectPatternPath
              .findParent(
                path => path.isObjectProperty() || path.isVariableDeclarator(),
              )
              .remove();
          }
        });
      },

      // taken from transform-destructuring/src/index.js#visitor
      // export var { a, ...b } = c;
      ExportNamedDeclaration(path) {
        const declaration = path.get("declaration");
        if (!declaration.isVariableDeclaration()) return;

        const hasRest = declaration
          .get("declarations")
          .some(path => hasObjectRestElement(path.get("id")));
        if (!hasRest) return;

        // Split the declaration and export list into two declarations so that the variable
        // declaration can be split up later without needing to worry about not being a
        // top-level statement.
        if (!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE) {
          // polyfill when being run by an older Babel version
          path.splitExportDeclaration ??=
            // eslint-disable-next-line no-restricted-globals
            require("@babel/traverse").NodePath.prototype.splitExportDeclaration;
        }
        path.splitExportDeclaration();
      },

      // try {} catch ({a, ...b}) {}
      CatchClause(path) {
        const paramPath = path.get("param");
        replaceRestElement(path, paramPath);
      },

      // ({a, ...b} = c);
      AssignmentExpression(path, file) {
        const leftPath = path.get("left");
        if (leftPath.isObjectPattern() && hasObjectRestElement(leftPath)) {
          const nodes = [];

          const refName = path.scope.generateUidBasedOnNode(
            path.node.right,
            "ref",
          );

          nodes.push(
            t.variableDeclaration("var", [
              t.variableDeclarator(t.identifier(refName), path.node.right),
            ]),
          );

          const [impureComputedPropertyDeclarators, argument, callExpression] =
            createObjectRest(leftPath, file, t.identifier(refName));

          if (impureComputedPropertyDeclarators.length > 0) {
            nodes.push(
              t.variableDeclaration("var", impureComputedPropertyDeclarators),
            );
          }

          const nodeWithoutSpread = t.cloneNode(path.node);
          nodeWithoutSpread.right = t.identifier(refName);
          nodes.push(t.expressionStatement(nodeWithoutSpread));
          nodes.push(
            t.expressionStatement(
              t.assignmentExpression("=", argument, callExpression),
            ),
          );
          nodes.push(t.expressionStatement(t.identifier(refName)));

          path.replaceWithMultiple(nodes);
        }
      },

      // taken from transform-destructuring/src/index.js#visitor
      ForXStatement(path: NodePath<t.ForXStatement>) {
        const { node, scope } = path;
        const leftPath = path.get("left");

        if (!leftPath.isVariableDeclaration()) {
          if (!hasObjectRestElement(leftPath)) {
            return;
          }
          // for ({a, ...b} of []) {}
          const temp = scope.generateUidIdentifier("ref");

          node.left = t.variableDeclaration("var", [
            t.variableDeclarator(temp),
          ]);

          path.ensureBlock();

          const statementBody = (path.node.body as t.BlockStatement).body;
          const nodes = [];
          // todo: the completion of a for statement can only be observed from
          // a do block (or eval that we don't support),
          // but the new do-expression proposal plans to ban iteration ends in the
          // do block, maybe we can get rid of this
          if (statementBody.length === 0 && path.isCompletionRecord()) {
            nodes.unshift(t.expressionStatement(scope.buildUndefinedNode()));
          }

          nodes.unshift(
            t.expressionStatement(
              t.assignmentExpression("=", leftPath.node, t.cloneNode(temp)),
            ),
          );

          unshiftForXStatementBody(path, nodes);
          scope.crawl();
          return;
        } else {
          // for (var {a, ...b} of []) {}
          const patternPath = leftPath.get("declarations")[0].get("id");
          if (!hasObjectRestElement(patternPath)) {
            return;
          }
          const left = leftPath.node;
          const pattern = patternPath.node;

          const key = scope.generateUidIdentifier("ref");
          node.left = t.variableDeclaration(left.kind, [
            t.variableDeclarator(key, null),
          ]);

          path.ensureBlock();

          unshiftForXStatementBody(path, [
            t.variableDeclaration(node.left.kind, [
              t.variableDeclarator(pattern, t.cloneNode(key)),
            ]),
          ]);
          scope.crawl();
          return;
        }
      },

      // [{a, ...b}] = c;
      ArrayPattern(path) {
        type LhsAndRhs = { left: t.ObjectPattern; right: t.Identifier };
        const objectPatterns: LhsAndRhs[] = [];
        const { scope } = path;
        const uidIdentifiers: t.Identifier[] = [];

        visitObjectRestElements(path, path => {
          const objectPattern = path.parentPath as NodePath<t.ObjectPattern>;

          const uid = scope.generateUidIdentifier("ref");
          objectPatterns.push({ left: objectPattern.node, right: uid });
          uidIdentifiers.push(uid);

          objectPattern.replaceWith(t.cloneNode(uid));
          path.skip();
        });

        if (objectPatterns.length > 0) {
          const patternParentPath = path.findParent(
            path => !(path.isPattern() || path.isObjectProperty()),
          );
          const patternParent = patternParentPath.node;
          switch (patternParent.type) {
            case "VariableDeclarator":
              patternParentPath.insertAfter(
                objectPatterns.map(({ left, right }) =>
                  t.variableDeclarator(left, right),
                ),
              );
              break;
            case "AssignmentExpression":
              {
                for (const uidIdentifier of uidIdentifiers) {
                  scope.push({ id: t.cloneNode(uidIdentifier) });
                }
                patternParentPath.insertAfter(
                  objectPatterns.map(({ left, right }) =>
                    t.assignmentExpression("=", left, right),
                  ),
                );
              }
              break;
            default:
              throw new Error(
                `Unexpected pattern parent type: ${patternParent.type}`,
              );
          }
        }
      },

      // var a = { ...b, ...c }
      ObjectExpression(path, file) {
        if (!hasSpread(path.node)) return;

        let helper: t.Identifier | t.MemberExpression;
        if (setSpreadProperties) {
          helper = getExtendsHelper(file);
        } else {
          if (process.env.BABEL_8_BREAKING) {
            helper = file.addHelper("objectSpread2");
          } else {
            try {
              helper = file.addHelper("objectSpread2");
            } catch {
              // TODO: This is needed to workaround https://github.com/babel/babel/issues/10187
              // and https://github.com/babel/babel/issues/10179 for older @babel/core versions
              // where #10187 isn't fixed.
              this.file.declarations.objectSpread2 = null;

              // objectSpread2 has been introduced in v7.5.0
              // We have to maintain backward compatibility.
              helper = file.addHelper("objectSpread");
            }
          }
        }

        let exp: t.CallExpression = null;
        let props: t.ObjectMember[] = [];

        function make() {
          const hadProps = props.length > 0;
          const obj = t.objectExpression(props);
          props = [];

          if (!exp) {
            exp = t.callExpression(helper, [obj]);
            return;
          }

          // When we can assume that getters are pure and don't depend on
          // the order of evaluation, we can avoid making multiple calls.
          if (pureGetters) {
            if (hadProps) {
              exp.arguments.push(obj);
            }
            return;
          }

          exp = t.callExpression(t.cloneNode(helper), [
            exp,
            // If we have static props, we need to insert an empty object
            // because the odd arguments are copied with [[Get]], not
            // [[GetOwnProperty]]
            ...(hadProps ? [t.objectExpression([]), obj] : []),
          ]);
        }

        for (const prop of path.node.properties) {
          if (t.isSpreadElement(prop)) {
            make();
            exp.arguments.push(prop.argument);
          } else {
            props.push(prop);
          }
        }

        if (props.length) make();

        path.replaceWith(exp);
      },
    },
  };
});
