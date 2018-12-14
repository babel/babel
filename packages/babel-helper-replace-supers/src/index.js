import type { NodePath } from "@babel/traverse";
import traverse from "@babel/traverse";
import memberExpressionToFunctions from "@babel/helper-member-expression-to-functions";
import optimiseCall from "@babel/helper-optimise-call-expression";
import * as t from "@babel/types";

/**
 * Creates an expression which result is the proto of objectRef.
 *
 * @example <caption>isStatic === true</caption>
 *
 *   helpers.getPrototypeOf(CLASS)
 *
 * @example <caption>isStatic === false</caption>
 *
 *   helpers.getPrototypeOf(CLASS.prototype)
 */
function getPrototypeOfExpression(objectRef, isStatic, file) {
  objectRef = t.cloneNode(objectRef);
  const targetRef = isStatic
    ? objectRef
    : t.memberExpression(objectRef, t.identifier("prototype"));

  return t.callExpression(file.addHelper("getPrototypeOf"), [targetRef]);
}

function skipAllButComputedKey(path) {
  // If the path isn't computed, just skip everything.
  if (!path.node.computed) {
    path.skip();
    return;
  }

  // So it's got a computed key. Make sure to skip every other key the
  // traversal would visit.
  const keys = t.VISITOR_KEYS[path.type];
  for (const key of keys) {
    if (key !== "key") path.skipKey(key);
  }
}

export const environmentVisitor = {
  TypeAnnotation(path) {
    path.skip();
  },
  Function(path) {
    // Methods will be handled by the Method visit
    if (path.isMethod()) return;
    // Arrow functions inherit their parent's environment
    if (path.isArrowFunctionExpression()) return;
    path.skip();
  },

  Method(path) {
    skipAllButComputedKey(path);
  },

  "ClassProperty|ClassPrivateProperty"(path) {
    // If the property is computed, we need to visit everything.
    if (path.node.static) return;
    skipAllButComputedKey(path);
  },
};

const visitor = traverse.visitors.merge([
  environmentVisitor,
  {
    Super(path, state) {
      const { node, parentPath } = path;
      if (!parentPath.isMemberExpression({ object: node })) return;
      state.handle(parentPath);
    },
  },
]);

const specHandlers = {
  memoise(superMember, count) {
    const { scope, node } = superMember;
    const { computed, property } = node;
    if (!computed) {
      return;
    }

    const memo = scope.maybeGenerateMemoised(property);
    if (!memo) {
      return;
    }

    this.memoiser.set(property, memo, count);
  },

  prop(superMember) {
    const { computed, property } = superMember.node;
    if (this.memoiser.has(property)) {
      return t.cloneNode(this.memoiser.get(property));
    }

    if (computed) {
      return t.cloneNode(property);
    }

    return t.stringLiteral(property.name);
  },

  get(superMember) {
    return t.callExpression(this.file.addHelper("get"), [
      getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file),
      this.prop(superMember),
      t.thisExpression(),
    ]);
  },

  set(superMember, value) {
    return t.callExpression(this.file.addHelper("set"), [
      getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file),
      this.prop(superMember),
      value,
      t.thisExpression(),
      t.booleanLiteral(superMember.isInStrictMode()),
    ]);
  },

  call(superMember, args) {
    return optimiseCall(this.get(superMember), t.thisExpression(), args);
  },
};

const looseHandlers = {
  ...specHandlers,

  prop(superMember) {
    const { property } = superMember.node;
    if (this.memoiser.has(property)) {
      return t.cloneNode(this.memoiser.get(property));
    }

    return t.cloneNode(property);
  },

  get(superMember) {
    const { isStatic, superRef } = this;
    const { computed } = superMember.node;
    const prop = this.prop(superMember);

    let object;
    if (isStatic) {
      object = superRef
        ? t.cloneNode(superRef)
        : t.memberExpression(
            t.identifier("Function"),
            t.identifier("prototype"),
          );
    } else {
      object = superRef
        ? t.memberExpression(t.cloneNode(superRef), t.identifier("prototype"))
        : t.memberExpression(t.identifier("Object"), t.identifier("prototype"));
    }

    return t.memberExpression(object, prop, computed);
  },

  set(superMember, value) {
    const { computed } = superMember.node;
    const prop = this.prop(superMember);

    return t.assignmentExpression(
      "=",
      t.memberExpression(t.thisExpression(), prop, computed),
      value,
    );
  },
};

export default class ReplaceSupers {
  constructor(opts: Object) {
    const path = opts.methodPath;

    this.methodPath = path;
    this.isStatic =
      path.isClassMethod({ static: true }) || path.isObjectMethod();

    this.file = opts.file;
    this.superRef = opts.superRef;
    this.isLoose = opts.isLoose;
    this.opts = opts;
  }

  methodPath: NodePath;
  superRef: Object;
  isStatic: boolean;
  isLoose: boolean;
  file;
  opts: {
    getObjetRef: Function,
    methodPath: NodePath,
    superRef: Object,
    isLoose: boolean,
    file: any,
  };

  getObjectRef() {
    return t.cloneNode(this.opts.objectRef || this.opts.getObjectRef());
  }

  replace() {
    const handler = this.isLoose ? looseHandlers : specHandlers;

    memberExpressionToFunctions(this.methodPath, visitor, {
      file: this.file,
      isStatic: this.isStatic,
      getObjectRef: this.getObjectRef.bind(this),
      superRef: this.superRef,
      ...handler,
    });
  }
}
