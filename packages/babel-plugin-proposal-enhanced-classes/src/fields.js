import { template, traverse, types as t } from "@babel/core";
import { environmentVisitor } from "@babel/helper-replace-supers";
import memberExpressionToFunctions from "@babel/helper-member-expression-to-functions";
import optimiseCall from "@babel/helper-optimise-call-expression";

export function buildPrivateNamesMap(props) {
  const privateNamesMap = new Map();
  for (const prop of props) {
    if (prop.isPrivate()) {
      const { name } = prop.node.key.id;
      const id = prop.scope.generateUidIdentifier(name);
      privateNamesMap.set(name, id);
    }
  }
  return privateNamesMap;
}

export function buildPrivateNamesNodes(privateNamesMap, loose, state) {
  const initNodes = [];

  const looseHelper = () => state.addHelper("classPrivateFieldLooseKey");

  for (const [name, id] of privateNamesMap) {
    const init = loose
      ? template.statement.ast`var ${id} = ${looseHelper()}("${name}");`
      : template.statement.ast`var ${id} = new WeakMap();`;
    initNodes.push(init);
  }

  return initNodes;
}

// Traverses the class scope, handling private name references.  If an inner
// class redeclares the same private name, it will hand off traversal to the
// restricted visitor (which doesn't traverse the inner class's inner scope).
const privateNameVisitor = {
  PrivateName(path) {
    const { privateNamesMap } = this;
    const { node, parentPath } = path;

    if (!parentPath.isMemberExpression({ property: node })) return;
    if (!privateNamesMap.has(node.id.name)) return;

    this.handle(parentPath);
  },

  Class(path) {
    const { privateNamesMap } = this;
    const body = path.get("body.body");

    for (const prop of body) {
      if (!prop.isClassPrivateProperty()) continue;
      if (!privateNamesMap.has(prop.node.key.id.name)) continue;

      // This class redeclares the private name.
      // So, we can only evaluate the things in the outer scope.
      path.traverse(privateNameInnerVisitor, this);
      path.skip();
      break;
    }
  },
};

// Traverses the outer portion of a class, without touching the class's inner
// scope, for private names.
const privateNameInnerVisitor = traverse.visitors.merge([
  {
    PrivateName: privateNameVisitor.PrivateName,
  },
  environmentVisitor,
]);

const privateNameHandlerSpec = {
  memoise(member, count) {
    const { scope } = member;
    const { object } = member.node;

    const memo = scope.maybeGenerateMemoised(object);
    if (!memo) {
      return;
    }

    this.memoiser.set(object, memo, count);
  },

  receiver(member) {
    const { object } = member.node;

    if (this.memoiser.has(object)) {
      return t.cloneNode(this.memoiser.get(object));
    }

    return t.cloneNode(object);
  },

  get(member) {
    const { privateNamesMap, file } = this;
    const { name } = member.node.property.id;

    return t.callExpression(file.addHelper("classPrivateFieldGet"), [
      this.receiver(member),
      t.cloneNode(privateNamesMap.get(name)),
    ]);
  },

  set(member, value) {
    const { privateNamesMap, file } = this;
    const { name } = member.node.property.id;

    return t.callExpression(file.addHelper("classPrivateFieldSet"), [
      this.receiver(member),
      t.cloneNode(privateNamesMap.get(name)),
      value,
    ]);
  },

  call(member, args) {
    // The first access (the get) should do the memo assignment.
    this.memoise(member, 1);

    return optimiseCall(this.get(member), this.receiver(member), args);
  },
};

const privateNameHandlerLoose = {
  handle(member) {
    const { privateNamesMap, file } = this;
    const { object } = member.node;
    const { name } = member.node.property.id;

    member.replaceWith(
      template.expression`BASE(REF, PROP)[PROP]`({
        BASE: file.addHelper("classPrivateFieldLooseBase"),
        REF: object,
        PROP: privateNamesMap.get(name),
      }),
    );
  },
};

export function transformPrivateNamesUsage(
  path,
  privateNamesMap,
  loose,
  state,
) {
  const body = path.get("body");

  if (loose) {
    body.traverse(privateNameVisitor, {
      privateNamesMap,
      file: state,
      ...privateNameHandlerLoose,
    });
  } else {
    memberExpressionToFunctions(body, privateNameVisitor, {
      privateNamesMap,
      file: state,
      ...privateNameHandlerSpec,
    });
  }
}

function buildPrivateFieldInitNode(ref, prop, privateNamesMap, loose) {
  const id = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  if (loose) {
    return template.statement.ast`
      Object.defineProperty(${ref}, ${id}, {
        // configurable is false by default
        // enumerable is false by default
        writable: true,
        value: ${value}
      });
    `;
  } else {
    return template.statement.ast`${id}.set(${ref}, {
      // configurable is always false for private elements
      // enumerable is always false for private elements
      writable: true,
      value: ${value},
    })`;
  }
}

function buildPublicFieldInitNode(ref, prop, state, loose) {
  const { key, computed } = prop.node;
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  if (loose) {
    return t.expressionStatement(
      t.assignmentExpression(
        "=",
        t.memberExpression(ref, key, computed || t.isLiteral(key)),
        value,
      ),
    );
  } else {
    return t.expressionStatement(
      t.callExpression(state.addHelper("defineProperty"), [
        ref,
        computed || t.isLiteral(key) ? key : t.stringLiteral(key.name),
        value,
      ]),
    );
  }
}

export function buildFieldsInitNodes(
  ref,
  props,
  privateNamesMap,
  state,
  loose,
) {
  const staticNodes = [];
  const instanceNodes = [];

  for (const prop of props) {
    if (prop.node.static) {
      staticNodes.push(
        buildPublicFieldInitNode(t.cloneNode(ref), prop, state, loose),
      );
    } else if (prop.isPrivate()) {
      instanceNodes.push(
        buildPrivateFieldInitNode(
          t.thisExpression(),
          prop,
          privateNamesMap,
          loose,
        ),
      );
    } else {
      instanceNodes.push(
        buildPublicFieldInitNode(t.thisExpression(), prop, state, loose),
      );
    }
  }

  return { staticNodes, instanceNodes };
}
