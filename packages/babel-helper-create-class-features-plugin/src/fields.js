import { template, traverse, types as t } from "@babel/core";
import { environmentVisitor } from "@babel/helper-replace-supers";
import memberExpressionToFunctions from "@babel/helper-member-expression-to-functions";
import optimiseCall from "@babel/helper-optimise-call-expression";

export function buildPrivateNamesMap(props) {
  const privateNamesMap = new Map();
  for (const prop of props) {
    const isPrivate = prop.isPrivate();
    const isMethod = !prop.isProperty();
    const isInstance = !prop.node.static;
    if (isPrivate) {
      const { name } = prop.node.key.id;
      const update = privateNamesMap.has(name)
        ? privateNamesMap.get(name)
        : {
            id: prop.scope.generateUidIdentifier(name),
            static: !isInstance,
            method: isMethod,
          };
      if (prop.node.kind === "get") {
        update.getId = prop.scope.generateUidIdentifier(`get_${name}`);
      } else if (prop.node.kind === "set") {
        update.setId = prop.scope.generateUidIdentifier(`set_${name}`);
      } else if (prop.node.kind === "method" && isMethod && isInstance) {
        update.methodId = prop.scope.generateUidIdentifier(name);
      }
      privateNamesMap.set(name, update);
    }
  }
  return privateNamesMap;
}

export function buildPrivateNamesNodes(privateNamesMap, loose, state) {
  const initNodes = [];

  for (const [name, value] of privateNamesMap) {
    // In loose mode, both static and instance fields are transpiled using a
    // secret non-enumerable property. Hence, we also need to generate that
    // key (using the classPrivateFieldLooseKey helper).
    // In spec mode, only instance fields need a "private name" initializer
    // because static fields are directly assigned to a variable in the
    // buildPrivateStaticFieldInitSpec function.
    const { id, static: isStatic, method: isMethod, getId, setId } = value;
    if (loose) {
      initNodes.push(
        template.statement.ast`
          var ${id} = ${state.addHelper("classPrivateFieldLooseKey")}("${name}")
        `,
      );
    } else if (isMethod && !isStatic) {
      if (getId || setId) {
        initNodes.push(template.statement.ast`var ${id} = new WeakMap();`);
      } else {
        initNodes.push(template.statement.ast`var ${id} = new WeakSet();`);
      }
    } else if (!isStatic) {
      initNodes.push(template.statement.ast`var ${id} = new WeakMap();`);
    }
  }

  return initNodes;
}

// Traverses the class scope, handling private name references. If an inner
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
      if (!prop.isPrivate()) {
        continue;
      }
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
    const { classRef, privateNamesMap, file } = this;
    const { name } = member.node.property.id;
    const {
      id,
      static: isStatic,
      method: isMethod,
      methodId,
      getId,
      setId,
    } = privateNamesMap.get(name);

    if (isStatic && !isMethod) {
      return t.callExpression(
        file.addHelper("classStaticPrivateFieldSpecGet"),
        [this.receiver(member), t.cloneNode(classRef), t.cloneNode(id)],
      );
    }
    if (isMethod) {
      if (getId || setId) {
        return t.callExpression(file.addHelper("classPrivateFieldGet"), [
          this.receiver(member),
          t.cloneNode(id),
        ]);
      }
      return t.callExpression(file.addHelper("classPrivateMethodGet"), [
        this.receiver(member),
        t.cloneNode(id),
        t.cloneNode(methodId),
      ]);
    }
    return t.callExpression(file.addHelper("classPrivateFieldGet"), [
      this.receiver(member),
      t.cloneNode(id),
    ]);
  },

  set(member, value) {
    const { classRef, privateNamesMap, file } = this;
    const { name } = member.node.property.id;
    const {
      id,
      static: isStatic,
      method: isMethod,
      setId,
    } = privateNamesMap.get(name);

    if (isStatic && !isMethod) {
      return t.callExpression(
        file.addHelper("classStaticPrivateFieldSpecSet"),
        [this.receiver(member), t.cloneNode(classRef), t.cloneNode(id), value],
      );
    }
    if (isMethod) {
      if (setId) {
        return t.callExpression(file.addHelper("classPrivateFieldSet"), [
          this.receiver(member),
          t.cloneNode(id),
          value,
        ]);
      }
      return t.callExpression(file.addHelper("classPrivateMethodSet"), []);
    }
    return t.callExpression(file.addHelper("classPrivateFieldSet"), [
      this.receiver(member),
      t.cloneNode(id),
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
        PROP: privateNamesMap.get(name).id,
      }),
    );
  },
};

export function transformPrivateNamesUsage(
  ref,
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
      classRef: ref,
      file: state,
      ...privateNameHandlerSpec,
    });
  }
}

function buildPrivateFieldInitLoose(ref, prop, privateNamesMap) {
  const { id } = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  return template.statement.ast`
    Object.defineProperty(${ref}, ${id}, {
      // configurable is false by default
      // enumerable is false by default
      writable: true,
      value: ${value}
    });
  `;
}

function buildPrivateInstanceFieldInitSpec(ref, prop, privateNamesMap) {
  const { id } = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  return template.statement.ast`${id}.set(${ref}, {
    // configurable is always false for private elements
    // enumerable is always false for private elements
    writable: true,
    value: ${value},
  })`;
}

function buildPrivateStaticFieldInitSpec(prop, privateNamesMap) {
  const { id } = privateNamesMap.get(prop.node.key.id.name);
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  return template.statement.ast`
    var ${id} = {
      // configurable is false by default
      // enumerable is false by default
      writable: true,
      value: ${value}
    };
  `;
}

function buildPrivateMethodInitLoose(ref, prop, privateNamesMap) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const { methodId, id, getId, setId, initAdded } = privateName;
  if (initAdded) return;

  if (methodId) {
    return template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          value: ${methodId.name}
        });
      `;
  }

  if (getId || setId) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      initAdded: true,
    });

    if (getId && setId) {
      return template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          get: ${getId.name},
          set: ${setId.name}
        });
      `;
    } else if (getId && !setId) {
      return template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          get: ${getId.name}
        });
      `;
    } else if (!getId && setId) {
      return template.statement.ast`
        Object.defineProperty(${ref}, ${id}, {
          // configurable is false by default
          // enumerable is false by default
          // writable is false by default
          set: ${setId.name}
        });
      `;
    }
  }
}

function buildPrivateInstanceMethodInitSpec(ref, prop, privateNamesMap) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const { id, getId, setId, initAdded } = privateName;
  if (initAdded) return;

  if (getId || setId) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      initAdded: true,
    });

    if (getId && setId) {
      return template.statement.ast`
        ${id}.set(${ref}, {
          get: ${getId.name},
          set: ${setId.name}
        });
      `;
    } else if (getId && !setId) {
      return template.statement.ast`
        ${id}.set(${ref}, {
          get: ${getId.name}
        });
      `;
    } else if (!getId && setId) {
      return template.statement.ast`
        ${id}.set(${ref}, {
          set: ${setId.name}
        });
      `;
    }
  }
  return template.statement.ast`${id}.add(${ref})`;
}

function buildPublicFieldInitLoose(ref, prop) {
  const { key, computed } = prop.node;
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  return t.expressionStatement(
    t.assignmentExpression(
      "=",
      t.memberExpression(ref, key, computed || t.isLiteral(key)),
      value,
    ),
  );
}

function buildPublicFieldInitSpec(ref, prop, state) {
  const { key, computed } = prop.node;
  const value = prop.node.value || prop.scope.buildUndefinedNode();

  return t.expressionStatement(
    t.callExpression(state.addHelper("defineProperty"), [
      ref,
      computed || t.isLiteral(key) ? key : t.stringLiteral(key.name),
      value,
    ]),
  );
}

function buildPrivateInstanceMethodDeclaration(prop, privateNamesMap) {
  const privateName = privateNamesMap.get(prop.node.key.id.name);
  const {
    methodId,
    getId,
    setId,
    getterDeclared,
    setterDeclared,
  } = privateName;
  const { params, body, generator, async } = prop.node;
  const methodValue = t.functionExpression(
    methodId,
    params,
    body,
    generator,
    async,
  );
  const isGetter = getId && !getterDeclared && params.length === 0;
  const isSetter = setId && !setterDeclared && params.length > 0;

  if (isGetter) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      getterDeclared: true,
    });
    return t.variableDeclaration("var", [
      t.variableDeclarator(getId, methodValue),
    ]);
  }
  if (isSetter) {
    privateNamesMap.set(prop.node.key.id.name, {
      ...privateName,
      setterDeclared: true,
    });
    return t.variableDeclaration("var", [
      t.variableDeclarator(setId, methodValue),
    ]);
  }

  return t.variableDeclaration("var", [
    t.variableDeclarator(methodId, methodValue),
  ]);
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
  let needsClassRef = false;

  for (const prop of props) {
    const isStatic = prop.node.static;
    const isInstance = !isStatic;
    const isPrivate = prop.isPrivate();
    const isPublic = !isPrivate;
    const isField = prop.isProperty();
    const isMethod = !isField;

    switch (true) {
      case isStatic && isPrivate && isField && loose:
        needsClassRef = true;
        staticNodes.push(
          buildPrivateFieldInitLoose(t.cloneNode(ref), prop, privateNamesMap),
        );
        break;
      case isStatic && isPrivate && isField && !loose:
        needsClassRef = true;
        staticNodes.push(
          buildPrivateStaticFieldInitSpec(prop, privateNamesMap),
        );
        break;
      case isStatic && isPublic && isField && loose:
        needsClassRef = true;
        staticNodes.push(buildPublicFieldInitLoose(t.cloneNode(ref), prop));
        break;
      case isStatic && isPublic && isField && !loose:
        needsClassRef = true;
        staticNodes.push(
          buildPublicFieldInitSpec(t.cloneNode(ref), prop, state),
        );
        break;
      case isInstance && isPrivate && isField && loose:
        instanceNodes.push(
          buildPrivateFieldInitLoose(t.thisExpression(), prop, privateNamesMap),
        );
        break;
      case isInstance && isPrivate && isField && !loose:
        instanceNodes.push(
          buildPrivateInstanceFieldInitSpec(
            t.thisExpression(),
            prop,
            privateNamesMap,
          ),
        );
        break;
      case isInstance && isPrivate && isMethod && loose:
        instanceNodes.unshift(
          buildPrivateMethodInitLoose(
            t.thisExpression(),
            prop,
            privateNamesMap,
          ),
        );
        staticNodes.push(
          buildPrivateInstanceMethodDeclaration(prop, privateNamesMap),
        );
        break;
      case isInstance && isPrivate && isMethod && !loose:
        instanceNodes.unshift(
          buildPrivateInstanceMethodInitSpec(
            t.thisExpression(),
            prop,
            privateNamesMap,
          ),
        );
        staticNodes.push(
          buildPrivateInstanceMethodDeclaration(prop, privateNamesMap),
        );
        break;
      case isInstance && isPublic && isField && loose:
        instanceNodes.push(buildPublicFieldInitLoose(t.thisExpression(), prop));
        break;
      case isInstance && isPublic && isField && !loose:
        instanceNodes.push(
          buildPublicFieldInitSpec(t.thisExpression(), prop, state),
        );
        break;
      default:
        throw new Error("Unreachable.");
    }
  }

  return {
    staticNodes,
    instanceNodes: instanceNodes.filter(Boolean),
    wrapClass(path) {
      for (const prop of props) {
        prop.remove();
      }

      if (!needsClassRef) return path;

      if (path.isClassExpression()) {
        path.scope.push({ id: ref });
        path.replaceWith(
          t.assignmentExpression("=", t.cloneNode(ref), path.node),
        );
      } else if (!path.node.id) {
        // Anonymous class declaration
        path.node.id = ref;
      }

      return path;
    },
  };
}
