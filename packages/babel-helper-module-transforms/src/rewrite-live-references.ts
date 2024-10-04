import { template, types as t } from "@babel/core";
import type { NodePath, Visitor, Scope } from "@babel/core";

import type { ModuleMetadata } from "./normalize-and-load-metadata.ts";

interface RewriteReferencesVisitorState {
  exported: Map<any, any>;
  metadata: ModuleMetadata;
  requeueInParent: (path: NodePath) => void;
  scope: Scope;
  imported: Map<any, any>;
  buildImportReference: (
    [source, importName, localName]: readonly [string, string, string],
    identNode: t.Identifier | t.CallExpression | t.JSXIdentifier,
  ) => any;
  seen: WeakSet<object>;
}

interface RewriteBindingInitVisitorState {
  exported: Map<any, any>;
  metadata: ModuleMetadata;
  requeueInParent: (path: NodePath) => void;
  scope: Scope;
}

function isInType(path: NodePath) {
  do {
    switch (path.parent.type) {
      case "TSTypeAnnotation":
      case "TSTypeAliasDeclaration":
      case "TSTypeReference":
      case "TypeAnnotation":
      case "TypeAlias":
        return true;
      case "ExportSpecifier":
        return (
          (
            path.parentPath.parent as
              | t.ExportDefaultDeclaration
              | t.ExportNamedDeclaration
          ).exportKind === "type"
        );
      default:
        if (path.parentPath.isStatement() || path.parentPath.isExpression()) {
          return false;
        }
    }
  } while ((path = path.parentPath));
}

export default function rewriteLiveReferences(
  programPath: NodePath<t.Program>,
  metadata: ModuleMetadata,
  wrapReference: (ref: t.Expression, payload: unknown) => null | t.Expression,
) {
  const imported = new Map();
  const exported = new Map();
  const requeueInParent = (path: NodePath) => {
    // Manually re-queue `exports.default =` expressions so that the ES3
    // transform has an opportunity to convert them. Ideally this would
    // happen automatically from the replaceWith above. See #4140 for
    // more info.
    programPath.requeue(path);
  };

  for (const [source, data] of metadata.source) {
    for (const [localName, importName] of data.imports) {
      imported.set(localName, [source, importName, null]);
    }
    for (const localName of data.importsNamespace) {
      imported.set(localName, [source, null, localName]);
    }
  }

  for (const [local, data] of metadata.local) {
    let exportMeta = exported.get(local);
    if (!exportMeta) {
      exportMeta = [];
      exported.set(local, exportMeta);
    }

    exportMeta.push(...data.names);
  }

  // Rewrite initialization of bindings to update exports.
  const rewriteBindingInitVisitorState: RewriteBindingInitVisitorState = {
    metadata,
    requeueInParent,
    scope: programPath.scope,
    exported, // local name => exported name list
  };
  programPath.traverse(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    rewriteBindingInitVisitor,
    rewriteBindingInitVisitorState,
  );

  // Rewrite reads/writes from imports and exports to have the correct behavior.
  const rewriteReferencesVisitorState: RewriteReferencesVisitorState = {
    seen: new WeakSet(),
    metadata,
    requeueInParent,
    scope: programPath.scope,
    imported, // local / import
    exported, // local name => exported name list
    buildImportReference([source, importName, localName], identNode) {
      const meta = metadata.source.get(source);
      meta.referenced = true;

      if (localName) {
        if (meta.wrap) {
          // @ts-expect-error Fixme: we should handle the case when identNode is a JSXIdentifier
          identNode = wrapReference(identNode, meta.wrap) ?? identNode;
        }
        return identNode;
      }

      let namespace: t.Expression = t.identifier(meta.name);
      if (meta.wrap) {
        namespace = wrapReference(namespace, meta.wrap) ?? namespace;
      }

      if (importName === "default" && meta.interop === "node-default") {
        return namespace;
      }

      const computed = metadata.stringSpecifiers.has(importName);

      return t.memberExpression(
        namespace,
        computed ? t.stringLiteral(importName) : t.identifier(importName),
        computed,
      );
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  programPath.traverse(rewriteReferencesVisitor, rewriteReferencesVisitorState);
}

/**
 * A visitor to inject export update statements during binding initialization.
 */
const rewriteBindingInitVisitor: Visitor<RewriteBindingInitVisitorState> = {
  Scope(path) {
    path.skip();
  },
  ClassDeclaration(path) {
    const { requeueInParent, exported, metadata } = this;

    const { id } = path.node;
    if (!id) throw new Error("Expected class to have a name");
    const localName = id.name;

    const exportNames = exported.get(localName) || [];
    if (exportNames.length > 0) {
      const statement = t.expressionStatement(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        buildBindingExportAssignmentExpression(
          metadata,
          exportNames,
          t.identifier(localName),
          path.scope,
        ),
      );
      // @ts-expect-error todo(flow->ts): avoid mutations
      statement._blockHoist = path.node._blockHoist;

      requeueInParent(path.insertAfter(statement)[0]);
    }
  },
  VariableDeclaration(path) {
    const { requeueInParent, exported, metadata } = this;

    const isVar = path.node.kind === "var";

    for (const decl of path.get("declarations")) {
      const { id } = decl.node;
      let { init } = decl.node;
      if (
        t.isIdentifier(id) &&
        exported.has(id.name) &&
        !t.isArrowFunctionExpression(init) &&
        (!t.isFunctionExpression(init) || init.id) &&
        (!t.isClassExpression(init) || init.id)
      ) {
        if (!init) {
          if (isVar) {
            // This variable might have already been assigned to, and the
            // uninitalized declaration doesn't set it to `undefined` and does
            // not updated the exported value.
            continue;
          } else {
            init = path.scope.buildUndefinedNode();
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        decl.node.init = buildBindingExportAssignmentExpression(
          metadata,
          exported.get(id.name),
          init,
          path.scope,
        );
        requeueInParent(decl.get("init"));
      } else {
        for (const localName of Object.keys(
          decl.getOuterBindingIdentifiers(),
        )) {
          if (exported.has(localName)) {
            const statement = t.expressionStatement(
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              buildBindingExportAssignmentExpression(
                metadata,
                exported.get(localName),
                t.identifier(localName),
                path.scope,
              ),
            );
            // @ts-expect-error todo(flow->ts): avoid mutations
            statement._blockHoist = path.node._blockHoist;

            requeueInParent(path.insertAfter(statement)[0]);
          }
        }
      }
    }
  },
};

const buildBindingExportAssignmentExpression = (
  metadata: ModuleMetadata,
  exportNames: string[],
  localExpr: t.Expression,
  scope: Scope,
) => {
  const exportsObjectName = metadata.exportName;
  for (
    let currentScope = scope;
    currentScope != null;
    currentScope = currentScope.parent
  ) {
    if (currentScope.hasOwnBinding(exportsObjectName)) {
      currentScope.rename(exportsObjectName);
    }
  }
  return (exportNames || []).reduce((expr, exportName) => {
    // class Foo {} export { Foo, Foo as Bar };
    // as
    // class Foo {} exports.Foo = exports.Bar = Foo;
    const { stringSpecifiers } = metadata;
    const computed = stringSpecifiers.has(exportName);
    return t.assignmentExpression(
      "=",
      t.memberExpression(
        t.identifier(exportsObjectName),
        computed ? t.stringLiteral(exportName) : t.identifier(exportName),
        /* computed */ computed,
      ),
      expr,
    );
  }, localExpr);
};

const buildImportThrow = (localName: string) => {
  return template.expression.ast`
    (function() {
      throw new Error('"' + '${localName}' + '" is read-only.');
    })()
  `;
};

const rewriteReferencesVisitor: Visitor<RewriteReferencesVisitorState> = {
  ReferencedIdentifier(path) {
    const { seen, buildImportReference, scope, imported, requeueInParent } =
      this;
    if (seen.has(path.node)) return;
    seen.add(path.node);

    const localName = path.node.name;

    const importData = imported.get(localName);
    if (importData) {
      if (isInType(path)) {
        throw path.buildCodeFrameError(
          `Cannot transform the imported binding "${localName}" since it's also used in a type annotation. ` +
            `Please strip type annotations using @babel/preset-typescript or @babel/preset-flow.`,
        );
      }

      const localBinding = path.scope.getBinding(localName);
      const rootBinding = scope.getBinding(localName);

      // redeclared in this scope
      if (rootBinding !== localBinding) return;

      const ref = buildImportReference(importData, path.node);

      // Preserve the binding location so that sourcemaps are nicer.
      ref.loc = path.node.loc;

      if (
        (path.parentPath.isCallExpression({ callee: path.node }) ||
          path.parentPath.isOptionalCallExpression({ callee: path.node }) ||
          path.parentPath.isTaggedTemplateExpression({ tag: path.node })) &&
        t.isMemberExpression(ref)
      ) {
        path.replaceWith(t.sequenceExpression([t.numericLiteral(0), ref]));
      } else if (path.isJSXIdentifier() && t.isMemberExpression(ref)) {
        const { object, property } = ref;
        path.replaceWith(
          t.jsxMemberExpression(
            // @ts-expect-error todo(flow->ts): possible bug `object` might not have a name
            t.jsxIdentifier(object.name),
            // @ts-expect-error todo(flow->ts): possible bug `property` might not have a name
            t.jsxIdentifier(property.name),
          ),
        );
      } else {
        path.replaceWith(ref);
      }

      requeueInParent(path);

      // The path could have been replaced with an identifier that would
      // otherwise be re-visited, so we skip processing its children.
      path.skip();
    }
  },

  UpdateExpression(path) {
    const {
      scope,
      seen,
      imported,
      exported,
      requeueInParent,
      buildImportReference,
    } = this;

    if (seen.has(path.node)) return;

    seen.add(path.node);

    const arg = path.get("argument");

    // No change needed
    if (arg.isMemberExpression()) return;

    const update = path.node;

    if (arg.isIdentifier()) {
      const localName = arg.node.name;

      // redeclared in this scope
      if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
        return;
      }

      const exportedNames = exported.get(localName);
      const importData = imported.get(localName);

      if (exportedNames?.length > 0 || importData) {
        if (importData) {
          path.replaceWith(
            t.assignmentExpression(
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              (update.operator[0] + "=") as t.AssignmentExpression["operator"],
              buildImportReference(importData, arg.node),
              buildImportThrow(localName),
            ),
          );
        } else if (update.prefix) {
          // ++foo
          // =>   exports.foo = ++foo
          path.replaceWith(
            buildBindingExportAssignmentExpression(
              this.metadata,
              exportedNames,
              t.cloneNode(update),
              path.scope,
            ),
          );
        } else {
          // foo++
          // =>   (ref = i++, exports.i = i, ref)
          const ref = scope.generateDeclaredUidIdentifier(localName);

          path.replaceWith(
            t.sequenceExpression([
              t.assignmentExpression(
                "=",
                t.cloneNode(ref),
                t.cloneNode(update),
              ),
              buildBindingExportAssignmentExpression(
                this.metadata,
                exportedNames,
                t.identifier(localName),
                path.scope,
              ),
              t.cloneNode(ref),
            ]),
          );
        }
      }
    }

    requeueInParent(path);
    path.skip();
  },

  AssignmentExpression: {
    exit(path) {
      const {
        scope,
        seen,
        imported,
        exported,
        requeueInParent,
        buildImportReference,
      } = this;

      if (seen.has(path.node)) return;
      seen.add(path.node);

      const left = path.get("left");

      // No change needed
      if (left.isMemberExpression()) return;

      if (left.isIdentifier()) {
        // Simple update-assign foo += 1; export { foo };
        // =>   exports.foo =  (foo += 1);
        const localName = left.node.name;

        // redeclared in this scope
        if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
          return;
        }

        const exportedNames = exported.get(localName);
        const importData = imported.get(localName);
        if (exportedNames?.length > 0 || importData) {
          const assignment = path.node;

          if (importData) {
            assignment.left = buildImportReference(importData, left.node);

            assignment.right = t.sequenceExpression([
              assignment.right,
              buildImportThrow(localName),
            ]);
          }

          const { operator } = assignment;
          let newExpr;
          if (operator === "=") {
            newExpr = assignment;
          } else if (
            operator === "&&=" ||
            operator === "||=" ||
            operator === "??="
          ) {
            newExpr = t.assignmentExpression(
              "=",
              assignment.left,
              t.logicalExpression(
                operator.slice(0, -1) as t.LogicalExpression["operator"],
                t.cloneNode(assignment.left) as t.Expression,
                assignment.right,
              ),
            );
          } else {
            newExpr = t.assignmentExpression(
              "=",
              assignment.left,
              t.binaryExpression(
                operator.slice(0, -1) as t.BinaryExpression["operator"],
                t.cloneNode(assignment.left) as t.Expression,
                assignment.right,
              ),
            );
          }

          path.replaceWith(
            buildBindingExportAssignmentExpression(
              this.metadata,
              exportedNames,
              newExpr,
              path.scope,
            ),
          );

          requeueInParent(path);

          path.skip();
        }
      } else {
        const ids = left.getOuterBindingIdentifiers();
        const programScopeIds = Object.keys(ids).filter(
          localName =>
            scope.getBinding(localName) === path.scope.getBinding(localName),
        );
        const id = programScopeIds.find(localName => imported.has(localName));

        if (id) {
          path.node.right = t.sequenceExpression([
            path.node.right,
            buildImportThrow(id),
          ]);
        }

        // Complex ({a, b, c} = {}); export { a, c };
        // =>   ({a, b, c} = {}), (exports.a = a, exports.c = c);
        const items: t.Expression[] = [];
        programScopeIds.forEach(localName => {
          const exportedNames = exported.get(localName) || [];
          if (exportedNames.length > 0) {
            items.push(
              buildBindingExportAssignmentExpression(
                this.metadata,
                exportedNames,
                t.identifier(localName),
                path.scope,
              ),
            );
          }
        });

        if (items.length > 0) {
          let node: t.Node = t.sequenceExpression(items);
          if (path.parentPath.isExpressionStatement()) {
            node = t.expressionStatement(node);
            // @ts-expect-error todo(flow->ts): avoid mutations
            node._blockHoist = path.parentPath.node._blockHoist;
          }

          const statement = path.insertAfter(node)[0];
          requeueInParent(statement);
        }
      }
    },
  },
  ForXStatement(path) {
    const { scope, node } = path;
    const { left } = node;
    const { exported, imported, scope: programScope } = this;

    if (!t.isVariableDeclaration(left)) {
      let didTransformExport = false,
        importConstViolationName;
      const loopBodyScope = path.get("body").scope;
      for (const name of Object.keys(t.getOuterBindingIdentifiers(left))) {
        if (programScope.getBinding(name) === scope.getBinding(name)) {
          if (exported.has(name)) {
            didTransformExport = true;
            if (loopBodyScope.hasOwnBinding(name)) {
              loopBodyScope.rename(name);
            }
          }
          if (imported.has(name) && !importConstViolationName) {
            importConstViolationName = name;
          }
        }
      }
      if (!didTransformExport && !importConstViolationName) {
        return;
      }

      path.ensureBlock();
      const bodyPath = path.get("body") as NodePath<t.BlockStatement>;

      const newLoopId = scope.generateUidIdentifierBasedOnNode(left);
      path
        .get("left")
        .replaceWith(
          t.variableDeclaration("let", [
            t.variableDeclarator(t.cloneNode(newLoopId)),
          ]),
        );
      scope.registerDeclaration(path.get("left"));

      if (didTransformExport) {
        bodyPath.unshiftContainer(
          "body",
          t.expressionStatement(t.assignmentExpression("=", left, newLoopId)),
        );
      }
      if (importConstViolationName) {
        bodyPath.unshiftContainer(
          "body",
          t.expressionStatement(buildImportThrow(importConstViolationName)),
        );
      }
    }
  },
};
