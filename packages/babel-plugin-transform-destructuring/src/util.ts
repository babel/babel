import { types as t, template } from "@babel/core";
import type { File, Scope, NodePath } from "@babel/core";

function isPureVoid(node: t.Node) {
  return (
    t.isUnaryExpression(node) &&
    node.operator === "void" &&
    t.isPureish(node.argument)
  );
}

export function unshiftForXStatementBody(
  statementPath: NodePath<t.ForXStatement>,
  newStatements: t.Statement[],
) {
  statementPath.ensureBlock();
  const { scope, node } = statementPath;
  const bodyScopeBindings = statementPath.get("body").scope.bindings;
  const hasShadowedBlockScopedBindings = Object.keys(bodyScopeBindings).some(
    name => scope.hasBinding(name),
  );

  if (hasShadowedBlockScopedBindings) {
    // handle shadowed variables referenced in computed keys:
    // var a = 0;for (const { #x: x, [a++]: y } of z) { const a = 1; }
    node.body = t.blockStatement([...newStatements, node.body]);
  } else {
    (node.body as t.BlockStatement).body.unshift(...newStatements);
  }
}

/**
 * Test if an ArrayPattern's elements contain any RestElements.
 */

function hasArrayRest(pattern: t.ArrayPattern) {
  return pattern.elements.some(elem => t.isRestElement(elem));
}

/**
 * Test if an ObjectPattern's properties contain any RestElements.
 */

function hasObjectRest(pattern: t.ObjectPattern) {
  return pattern.properties.some(prop => t.isRestElement(prop));
}

interface UnpackableArrayExpression extends t.ArrayExpression {
  elements: (null | t.Expression)[];
}

const STOP_TRAVERSAL = {};

interface ArrayUnpackVisitorState {
  deopt: boolean;
  bindings: Record<string, t.Identifier>;
}

// NOTE: This visitor is meant to be used via t.traverse
const arrayUnpackVisitor = (
  node: t.Node,
  ancestors: t.TraversalAncestors,
  state: ArrayUnpackVisitorState,
) => {
  if (!ancestors.length) {
    // Top-level node: this is the array literal.
    return;
  }

  if (
    t.isIdentifier(node) &&
    t.isReferenced(node, ancestors[ancestors.length - 1].node) &&
    state.bindings[node.name]
  ) {
    state.deopt = true;
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw STOP_TRAVERSAL;
  }
};

export type DestructuringTransformerNode =
  | t.VariableDeclaration
  | t.ExpressionStatement
  | t.ReturnStatement;

interface DestructuringTransformerOption {
  blockHoist?: number;
  operator?: t.AssignmentExpression["operator"];
  nodes?: DestructuringTransformerNode[];
  kind?: t.VariableDeclaration["kind"];
  scope: Scope;
  arrayLikeIsIterable: boolean;
  iterableIsArray: boolean;
  objectRestNoSymbols: boolean;
  useBuiltIns: boolean;
  addHelper: File["addHelper"];
}
export class DestructuringTransformer {
  private blockHoist: number;
  private operator: t.AssignmentExpression["operator"];
  arrayRefSet: Set<string>;
  private nodes: DestructuringTransformerNode[];
  private scope: Scope;
  private kind: t.VariableDeclaration["kind"];
  private iterableIsArray: boolean;
  private arrayLikeIsIterable: boolean;
  private objectRestNoSymbols: boolean;
  private useBuiltIns: boolean;
  private addHelper: File["addHelper"];
  constructor(opts: DestructuringTransformerOption) {
    this.blockHoist = opts.blockHoist;
    this.operator = opts.operator;
    this.arrayRefSet = new Set();
    this.nodes = opts.nodes || [];
    this.scope = opts.scope;
    this.kind = opts.kind;
    this.iterableIsArray = opts.iterableIsArray;
    this.arrayLikeIsIterable = opts.arrayLikeIsIterable;
    this.objectRestNoSymbols = opts.objectRestNoSymbols;
    this.useBuiltIns = opts.useBuiltIns;
    this.addHelper = opts.addHelper;
  }

  getExtendsHelper() {
    return this.useBuiltIns
      ? t.memberExpression(t.identifier("Object"), t.identifier("assign"))
      : this.addHelper("extends");
  }

  buildVariableAssignment(
    id: t.AssignmentExpression["left"],
    init: t.Expression,
  ) {
    let op = this.operator;
    if (t.isMemberExpression(id) || t.isOptionalMemberExpression(id)) op = "=";

    let node: t.ExpressionStatement | t.VariableDeclaration;

    if (op) {
      node = t.expressionStatement(
        t.assignmentExpression(
          op,
          id,
          t.cloneNode(init) || this.scope.buildUndefinedNode(),
        ),
      );
    } else {
      let nodeInit: t.Expression;

      if ((this.kind === "const" || this.kind === "using") && init === null) {
        nodeInit = this.scope.buildUndefinedNode();
      } else {
        nodeInit = t.cloneNode(init);
      }

      node = t.variableDeclaration(this.kind, [
        t.variableDeclarator(id as t.LVal, nodeInit),
      ]);
    }

    //@ts-expect-error(todo): document block hoist property
    node._blockHoist = this.blockHoist;

    return node;
  }

  buildVariableDeclaration(id: t.Identifier, init: t.Expression) {
    const declar = t.variableDeclaration("var", [
      t.variableDeclarator(t.cloneNode(id), t.cloneNode(init)),
    ]);
    // @ts-expect-error todo(flow->ts): avoid mutations
    declar._blockHoist = this.blockHoist;
    return declar;
  }

  push(id: t.LVal, _init: t.Expression | null) {
    const init = t.cloneNode(_init);
    if (t.isObjectPattern(id)) {
      this.pushObjectPattern(id, init);
    } else if (t.isArrayPattern(id)) {
      this.pushArrayPattern(id, init);
    } else if (t.isAssignmentPattern(id)) {
      this.pushAssignmentPattern(id, init);
    } else {
      this.nodes.push(this.buildVariableAssignment(id, init));
    }
  }

  toArray(node: t.Expression, count?: false | number) {
    if (
      this.iterableIsArray ||
      (t.isIdentifier(node) && this.arrayRefSet.has(node.name))
    ) {
      return node;
    } else {
      const { scope, arrayLikeIsIterable } = this;

      if (t.isIdentifier(node)) {
        const binding = scope.getBinding(node.name);
        if (binding?.constant && binding.path.isGenericType("Array")) {
          return node;
        }
      }

      if (t.isArrayExpression(node)) {
        return node;
      }

      if (t.isIdentifier(node, { name: "arguments" })) {
        return template.expression.ast`
          Array.prototype.slice.call(${node})
        `;
      }

      let helperName;
      const args = [node];
      if (typeof count === "number") {
        args.push(t.numericLiteral(count));

        // Used in array-rest to create an array from a subset of an iterable.
        helperName = "slicedToArray";
        // TODO if (this.hub.isLoose("es6.forOf")) helperName += "-loose";
      } else {
        // Used in array-rest to create an array
        helperName = "toArray";
      }

      if (arrayLikeIsIterable) {
        args.unshift(scope.path.hub.addHelper(helperName));
        helperName = "maybeArrayLike";
      }

      return t.callExpression(scope.path.hub.addHelper(helperName), args);
    }
  }

  pushAssignmentPattern(
    { left, right }: t.AssignmentPattern,
    valueRef: t.Expression | null,
  ) {
    // handle array init with void 0. This also happens when
    // the value was originally a hole.
    // const [x = 42] = [void 0,];
    // -> const x = 42;
    if (isPureVoid(valueRef)) {
      this.push(left, right);
      return;
    }

    // we need to assign the current value of the assignment to avoid evaluating
    // it more than once
    const tempId = this.scope.generateUidIdentifierBasedOnNode(valueRef);

    this.nodes.push(this.buildVariableDeclaration(tempId, valueRef));

    const tempConditional = t.conditionalExpression(
      t.binaryExpression(
        "===",
        t.cloneNode(tempId),
        this.scope.buildUndefinedNode(),
      ),
      right,
      t.cloneNode(tempId),
    );

    if (t.isPattern(left)) {
      let patternId;
      let node;

      if (
        this.kind === "const" ||
        this.kind === "let" ||
        this.kind === "using"
      ) {
        patternId = this.scope.generateUidIdentifier(tempId.name);
        node = this.buildVariableDeclaration(patternId, tempConditional);
      } else {
        patternId = tempId;

        node = t.expressionStatement(
          t.assignmentExpression("=", t.cloneNode(tempId), tempConditional),
        );
      }

      this.nodes.push(node);
      this.push(left, patternId);
    } else {
      this.nodes.push(this.buildVariableAssignment(left, tempConditional));
    }
  }

  pushObjectRest(
    pattern: t.ObjectPattern,
    objRef: t.Expression,
    spreadProp: t.RestElement,
    spreadPropIndex: number,
  ) {
    const value = buildObjectExcludingKeys(
      pattern.properties.slice(0, spreadPropIndex) as t.ObjectProperty[],
      objRef,
      this.scope,
      name => this.addHelper(name),
      this.objectRestNoSymbols,
      this.useBuiltIns,
    );
    this.nodes.push(this.buildVariableAssignment(spreadProp.argument, value));
  }

  pushObjectProperty(prop: t.ObjectProperty, propRef: t.Expression) {
    if (t.isLiteral(prop.key)) prop.computed = true;

    const pattern = prop.value as t.LVal;
    const objRef = t.memberExpression(
      t.cloneNode(propRef),
      prop.key,
      prop.computed,
    );

    if (t.isPattern(pattern)) {
      this.push(pattern, objRef);
    } else {
      this.nodes.push(this.buildVariableAssignment(pattern, objRef));
    }
  }

  pushObjectPattern(pattern: t.ObjectPattern, objRef: t.Expression) {
    // https://github.com/babel/babel/issues/681

    if (!pattern.properties.length) {
      this.nodes.push(
        t.expressionStatement(
          t.callExpression(
            this.addHelper("objectDestructuringEmpty"),
            isPureVoid(objRef) ? [] : [objRef],
          ),
        ),
      );
      return;
    }

    // if we have more than one properties in this pattern and the objectRef is a
    // member expression then we need to assign it to a temporary variable so it's
    // only evaluated once

    if (pattern.properties.length > 1 && !this.scope.isStatic(objRef)) {
      const temp = this.scope.generateUidIdentifierBasedOnNode(objRef);
      this.nodes.push(this.buildVariableDeclaration(temp, objRef));
      objRef = temp;
    }

    // Replace impure computed key expressions if we have a rest parameter
    if (hasObjectRest(pattern)) {
      let copiedPattern: t.ObjectPattern;
      for (let i = 0; i < pattern.properties.length; i++) {
        const prop = pattern.properties[i];
        if (t.isRestElement(prop)) {
          break;
        }
        const key = prop.key;
        if (prop.computed && !this.scope.isPure(key)) {
          const name = this.scope.generateUidIdentifierBasedOnNode(key);
          this.nodes.push(
            //@ts-expect-error PrivateName has been handled by destructuring-private
            this.buildVariableDeclaration(name, key),
          );
          if (!copiedPattern) {
            copiedPattern = pattern = {
              ...pattern,
              properties: pattern.properties.slice(),
            };
          }
          copiedPattern.properties[i] = {
            ...prop,
            key: name,
          };
        }
      }
    }

    for (let i = 0; i < pattern.properties.length; i++) {
      const prop = pattern.properties[i];
      if (t.isRestElement(prop)) {
        this.pushObjectRest(pattern, objRef, prop, i);
      } else {
        this.pushObjectProperty(prop, objRef);
      }
    }
  }

  canUnpackArrayPattern(
    pattern: t.ArrayPattern,
    arr: t.Expression,
  ): arr is UnpackableArrayExpression {
    // not an array so there's no way we can deal with this
    if (!t.isArrayExpression(arr)) return false;

    // pattern has less elements than the array and doesn't have a rest so some
    // elements won't be evaluated
    if (pattern.elements.length > arr.elements.length) return;
    if (
      pattern.elements.length < arr.elements.length &&
      !hasArrayRest(pattern)
    ) {
      return false;
    }

    for (const elem of pattern.elements) {
      // deopt on holes
      if (!elem) return false;

      // deopt on member expressions as they may be included in the RHS
      if (t.isMemberExpression(elem)) return false;
    }

    for (const elem of arr.elements) {
      // deopt on spread elements
      if (t.isSpreadElement(elem)) return false;

      // deopt call expressions as they might change values of LHS variables
      if (t.isCallExpression(elem)) return false;

      // deopt on member expressions as they may be getter/setters and have side-effects
      if (t.isMemberExpression(elem)) return false;
    }

    // deopt on reference to left side identifiers
    const bindings = t.getBindingIdentifiers(pattern);
    const state: ArrayUnpackVisitorState = { deopt: false, bindings };

    try {
      t.traverse(arr, arrayUnpackVisitor, state);
    } catch (e) {
      if (e !== STOP_TRAVERSAL) throw e;
    }

    return !state.deopt;
  }

  pushUnpackedArrayPattern(
    pattern: t.ArrayPattern,
    arr: UnpackableArrayExpression,
  ) {
    const holeToUndefined = (el: t.Expression) =>
      el ?? this.scope.buildUndefinedNode();

    for (let i = 0; i < pattern.elements.length; i++) {
      const elem = pattern.elements[i];
      if (t.isRestElement(elem)) {
        this.push(
          elem.argument,
          t.arrayExpression(arr.elements.slice(i).map(holeToUndefined)),
        );
      } else {
        this.push(elem, holeToUndefined(arr.elements[i]));
      }
    }
  }

  pushArrayPattern(pattern: t.ArrayPattern, arrayRef: t.Expression | null) {
    if (arrayRef === null) {
      this.nodes.push(
        t.expressionStatement(
          t.callExpression(this.addHelper("objectDestructuringEmpty"), []),
        ),
      );
      return;
    }
    if (!pattern.elements) return;

    // optimise basic array destructuring of an array expression
    //
    // we can't do this to a pattern of unequal size to it's right hand
    // array expression as then there will be values that won't be evaluated
    //
    // eg: let [a, b] = [1, 2];

    if (this.canUnpackArrayPattern(pattern, arrayRef)) {
      this.pushUnpackedArrayPattern(pattern, arrayRef);
      return;
    }

    // if we have a rest then we need all the elements so don't tell
    // `scope.toArray` to only get a certain amount

    const count = !hasArrayRest(pattern) && pattern.elements.length;

    // so we need to ensure that the `arrayRef` is an array, `scope.toArray` will
    // return a locally bound identifier if it's been inferred to be an array,
    // otherwise it'll be a call to a helper that will ensure it's one

    const toArray = this.toArray(arrayRef, count);

    if (t.isIdentifier(toArray)) {
      // we've been given an identifier so it must have been inferred to be an
      // array
      arrayRef = toArray;
    } else {
      arrayRef = this.scope.generateUidIdentifierBasedOnNode(arrayRef);
      this.arrayRefSet.add(arrayRef.name);
      this.nodes.push(this.buildVariableDeclaration(arrayRef, toArray));
    }

    for (let i = 0; i < pattern.elements.length; i++) {
      const elem = pattern.elements[i];

      // hole
      if (!elem) continue;

      let elemRef;

      if (t.isRestElement(elem)) {
        elemRef = this.toArray(arrayRef);
        elemRef = t.callExpression(
          t.memberExpression(elemRef, t.identifier("slice")),
          [t.numericLiteral(i)],
        );

        // set the element to the rest element argument since we've dealt with it
        // being a rest already
        this.push(elem.argument, elemRef);
      } else {
        elemRef = t.memberExpression(arrayRef, t.numericLiteral(i), true);
        this.push(elem, elemRef);
      }
    }
  }

  init(pattern: t.LVal, ref: t.Expression) {
    // trying to destructure a value that we can't evaluate more than once so we
    // need to save it to a variable

    if (!t.isArrayExpression(ref) && !t.isMemberExpression(ref)) {
      const memo = this.scope.maybeGenerateMemoised(ref, true);
      if (memo) {
        this.nodes.push(this.buildVariableDeclaration(memo, t.cloneNode(ref)));
        ref = memo;
      }
    }

    this.push(pattern, ref);

    return this.nodes;
  }
}

interface ExcludingKey {
  key: t.Expression | t.PrivateName;
  computed: boolean;
}

export function buildObjectExcludingKeys<T extends ExcludingKey>(
  excludedKeys: T[],
  objRef: t.Expression,
  scope: Scope,
  addHelper: File["addHelper"],
  objectRestNoSymbols: boolean,
  useBuiltIns: boolean,
): t.CallExpression {
  // get all the keys that appear in this object before the current spread

  const keys = [];
  let allLiteral = true;
  let hasTemplateLiteral = false;
  for (let i = 0; i < excludedKeys.length; i++) {
    const prop = excludedKeys[i];
    const key = prop.key;
    if (t.isIdentifier(key) && !prop.computed) {
      keys.push(t.stringLiteral(key.name));
    } else if (t.isTemplateLiteral(key)) {
      keys.push(t.cloneNode(key));
      hasTemplateLiteral = true;
    } else if (t.isLiteral(key)) {
      // @ts-expect-error todo(flow->ts) NullLiteral
      keys.push(t.stringLiteral(String(key.value)));
    } else if (t.isPrivateName(key)) {
      // private key is not enumerable
    } else {
      keys.push(t.cloneNode(key));
      allLiteral = false;
    }
  }

  let value;
  if (keys.length === 0) {
    const extendsHelper = useBuiltIns
      ? t.memberExpression(t.identifier("Object"), t.identifier("assign"))
      : addHelper("extends");
    value = t.callExpression(extendsHelper, [
      t.objectExpression([]),
      t.sequenceExpression([
        t.callExpression(addHelper("objectDestructuringEmpty"), [
          t.cloneNode(objRef),
        ]),
        t.cloneNode(objRef),
      ]),
    ]);
  } else {
    let keyExpression: t.Expression = t.arrayExpression(keys);

    if (!allLiteral) {
      keyExpression = t.callExpression(
        t.memberExpression(keyExpression, t.identifier("map")),
        [addHelper("toPropertyKey")],
      );
    } else if (!hasTemplateLiteral && !t.isProgram(scope.block)) {
      // Hoist definition of excluded keys, so that it's not created each time.
      const programScope = scope.getProgramParent();
      const id = programScope.generateUidIdentifier("excluded");

      programScope.push({
        id,
        init: keyExpression,
        kind: "const",
      });

      keyExpression = t.cloneNode(id);
    }

    value = t.callExpression(
      addHelper(`objectWithoutProperties${objectRestNoSymbols ? "Loose" : ""}`),
      [t.cloneNode(objRef), keyExpression],
    );
  }
  return value;
}

export function convertVariableDeclaration(
  path: NodePath<t.VariableDeclaration>,
  addHelper: File["addHelper"],
  arrayLikeIsIterable: boolean,
  iterableIsArray: boolean,
  objectRestNoSymbols: boolean,
  useBuiltIns: boolean,
) {
  const { node, scope } = path;

  const nodeKind = node.kind;
  const nodeLoc = node.loc;
  const nodes = [];

  for (let i = 0; i < node.declarations.length; i++) {
    const declar = node.declarations[i];

    const patternId = declar.init;
    const pattern = declar.id;

    const destructuring: DestructuringTransformer =
      new DestructuringTransformer({
        // @ts-expect-error(todo): avoid internal properties access
        blockHoist: node._blockHoist,
        nodes: nodes,
        scope: scope,
        kind: node.kind,
        iterableIsArray,
        arrayLikeIsIterable,
        useBuiltIns,
        objectRestNoSymbols,
        addHelper,
      });

    if (t.isPattern(pattern)) {
      destructuring.init(pattern, patternId);

      if (+i !== node.declarations.length - 1) {
        // we aren't the last declarator so let's just make the
        // last transformed node inherit from us
        t.inherits(nodes[nodes.length - 1], declar);
      }
    } else {
      nodes.push(
        t.inherits(
          destructuring.buildVariableAssignment(pattern, patternId),
          declar,
        ),
      );
    }
  }

  let tail: t.VariableDeclaration | null = null;
  let nodesOut = [];
  for (const node of nodes) {
    if (t.isVariableDeclaration(node)) {
      if (tail !== null) {
        // Create a single compound declarations
        tail.declarations.push(...node.declarations);
        continue;
      } else {
        // Make sure the original node kind is used for each compound declaration
        node.kind = nodeKind;
        tail = node;
      }
    } else {
      tail = null;
    }
    // Propagate the original declaration node's location
    if (!node.loc) {
      node.loc = nodeLoc;
    }
    nodesOut.push(node);
  }

  if (
    nodesOut.length === 2 &&
    t.isVariableDeclaration(nodesOut[0]) &&
    t.isExpressionStatement(nodesOut[1]) &&
    t.isCallExpression(nodesOut[1].expression) &&
    nodesOut[0].declarations.length === 1
  ) {
    // This can only happen when we generate this code:
    //    var _ref = DESTRUCTURED_VALUE;
    //     babelHelpers.objectDestructuringEmpty(_ref);
    // Since pushing those two statements to the for loop .init will require an IIFE,
    // we can optimize them to
    //     babelHelpers.objectDestructuringEmpty(DESTRUCTURED_VALUE);
    const expr = nodesOut[1].expression;
    expr.arguments = [nodesOut[0].declarations[0].init];
    nodesOut = [expr];
  } else {
    // We must keep nodes all are expressions or statements, so `replaceWithMultiple` can work.
    if (
      t.isForStatement(path.parent, { init: node }) &&
      !nodesOut.some(v => t.isVariableDeclaration(v))
    ) {
      for (let i = 0; i < nodesOut.length; i++) {
        const node: t.Node = nodesOut[i];
        if (t.isExpressionStatement(node)) {
          nodesOut[i] = node.expression;
        }
      }
    }
  }

  if (nodesOut.length === 1) {
    path.replaceWith(nodesOut[0]);
  } else {
    path.replaceWithMultiple(nodesOut);
  }
  scope.crawl();
}

export function convertAssignmentExpression(
  path: NodePath<t.AssignmentExpression & { left: t.Pattern }>,
  addHelper: File["addHelper"],
  arrayLikeIsIterable: boolean,
  iterableIsArray: boolean,
  objectRestNoSymbols: boolean,
  useBuiltIns: boolean,
) {
  const { node, scope, parentPath } = path;

  const nodes: DestructuringTransformerNode[] = [];

  const destructuring = new DestructuringTransformer({
    operator: node.operator,
    scope: scope,
    nodes: nodes,
    arrayLikeIsIterable,
    iterableIsArray,
    objectRestNoSymbols,
    useBuiltIns,
    addHelper,
  });

  let ref: t.Identifier | void;
  if (
    (!parentPath.isExpressionStatement() &&
      !parentPath.isSequenceExpression()) ||
    path.isCompletionRecord()
  ) {
    ref = scope.generateUidIdentifierBasedOnNode(node.right, "ref");

    nodes.push(
      t.variableDeclaration("var", [t.variableDeclarator(ref, node.right)]),
    );

    if (t.isArrayExpression(node.right)) {
      destructuring.arrayRefSet.add(ref.name);
    }
  }

  destructuring.init(node.left, ref || node.right);

  if (ref) {
    if (parentPath.isArrowFunctionExpression()) {
      path.replaceWith(t.blockStatement([]));
      nodes.push(t.returnStatement(t.cloneNode(ref)));
    } else {
      nodes.push(t.expressionStatement(t.cloneNode(ref)));
    }
  }

  path.replaceWithMultiple(nodes);
  scope.crawl();
}
