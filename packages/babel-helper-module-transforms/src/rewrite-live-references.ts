import assert from "assert";
import {
  assignmentExpression,
  callExpression,
  cloneNode,
  expressionStatement,
  getOuterBindingIdentifiers,
  identifier,
  isMemberExpression,
  isVariableDeclaration,
  jsxIdentifier,
  jsxMemberExpression,
  memberExpression,
  numericLiteral,
  sequenceExpression,
  stringLiteral,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";
import type * as t from "@babel/types";
import template from "@babel/template";
import type { NodePath, Visitor, Scope } from "@babel/traverse";
import simplifyAccess from "@babel/helper-simple-access";

import type { ModuleMetadata } from "./normalize-and-load-metadata";

interface RewriteReferencesVisitorState {
  exported: Map<any, any>;
  metadata: ModuleMetadata;
  requeueInParent: (path) => void;
  scope: Scope;
  imported: Map<any, any>;
  buildImportReference: (
    [source, importName, localName]: readonly [any, any, any],
    identNode,
  ) => any;
  seen: WeakSet<object>;
}

interface RewriteBindingInitVisitorState {
  exported: Map<any, any>;
  metadata: ModuleMetadata;
  requeueInParent: (path) => void;
  scope: Scope;
}

export default function rewriteLiveReferences(
  programPath: NodePath<t.Program>,
  metadata: ModuleMetadata,
) {
  const imported = new Map();
  const exported = new Map();
  const requeueInParent = path => {
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
    rewriteBindingInitVisitor,
    rewriteBindingInitVisitorState,
  );

  simplifyAccess(
    programPath,
    // NOTE(logan): The 'Array.from' calls are to make this code with in loose mode.
    new Set([...Array.from(imported.keys()), ...Array.from(exported.keys())]),
  );

  // Rewrite reads/writes from imports and exports to have the correct behavior.
  const rewriteReferencesVisitorState: RewriteReferencesVisitorState = {
    seen: new WeakSet(),
    metadata,
    requeueInParent,
    scope: programPath.scope,
    imported, // local / import
    exported, // local name => exported name list
    buildImportReference: ([source, importName, localName], identNode) => {
      const meta = metadata.source.get(source);

      if (localName) {
        if (meta.lazy) identNode = callExpression(identNode, []);
        return identNode;
      }

      let namespace: t.Expression = identifier(meta.name);
      if (meta.lazy) namespace = callExpression(namespace, []);

      if (importName === "default" && meta.interop === "node-default") {
        return namespace;
      }

      const computed = metadata.stringSpecifiers.has(importName);

      return memberExpression(
        namespace,
        computed ? stringLiteral(importName) : identifier(importName),
        computed,
      );
    },
  };
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
      const statement = expressionStatement(
        buildBindingExportAssignmentExpression(
          metadata,
          exportNames,
          identifier(localName),
        ),
      );
      // @ts-expect-error todo(flow->ts): avoid mutations
      statement._blockHoist = path.node._blockHoist;

      requeueInParent(path.insertAfter(statement)[0]);
    }
  },
  VariableDeclaration(path) {
    const { requeueInParent, exported, metadata } = this;

    Object.keys(path.getOuterBindingIdentifiers()).forEach(localName => {
      const exportNames = exported.get(localName) || [];

      if (exportNames.length > 0) {
        const statement = expressionStatement(
          buildBindingExportAssignmentExpression(
            metadata,
            exportNames,
            identifier(localName),
          ),
        );
        // @ts-expect-error todo(flow->ts): avoid mutations
        statement._blockHoist = path.node._blockHoist;

        requeueInParent(path.insertAfter(statement)[0]);
      }
    });
  },
};

const buildBindingExportAssignmentExpression = (
  metadata,
  exportNames,
  localExpr,
) => {
  return (exportNames || []).reduce((expr, exportName) => {
    // class Foo {} export { Foo, Foo as Bar };
    // as
    // class Foo {} exports.Foo = exports.Bar = Foo;
    const { stringSpecifiers } = metadata;
    const computed = stringSpecifiers.has(exportName);
    return assignmentExpression(
      "=",
      memberExpression(
        identifier(metadata.exportName),
        computed ? stringLiteral(exportName) : identifier(exportName),
        /* computed */ computed,
      ),
      expr,
    );
  }, localExpr);
};

const buildImportThrow = localName => {
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
        isMemberExpression(ref)
      ) {
        path.replaceWith(sequenceExpression([numericLiteral(0), ref]));
      } else if (path.isJSXIdentifier() && isMemberExpression(ref)) {
        const { object, property } = ref;
        path.replaceWith(
          jsxMemberExpression(
            // @ts-expect-error todo(flow->ts): possible bug `object` might not have a name
            jsxIdentifier(object.name),
            // @ts-expect-error todo(flow->ts): possible bug `property` might not have a name
            jsxIdentifier(property.name),
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
          assert(path.node.operator === "=", "Path was not simplified");

          const assignment = path.node;

          if (importData) {
            assignment.left = buildImportReference(importData, assignment.left);

            assignment.right = sequenceExpression([
              assignment.right,
              buildImportThrow(localName),
            ]);
          }

          path.replaceWith(
            buildBindingExportAssignmentExpression(
              this.metadata,
              exportedNames,
              assignment,
            ),
          );
          requeueInParent(path);
        }
      } else {
        const ids = left.getOuterBindingIdentifiers();
        const programScopeIds = Object.keys(ids).filter(
          localName =>
            scope.getBinding(localName) === path.scope.getBinding(localName),
        );
        const id = programScopeIds.find(localName => imported.has(localName));

        if (id) {
          path.node.right = sequenceExpression([
            path.node.right,
            buildImportThrow(id),
          ]);
        }

        // Complex ({a, b, c} = {}); export { a, c };
        // =>   ({a, b, c} = {}), (exports.a = a, exports.c = c);
        const items = [];
        programScopeIds.forEach(localName => {
          const exportedNames = exported.get(localName) || [];
          if (exportedNames.length > 0) {
            items.push(
              buildBindingExportAssignmentExpression(
                this.metadata,
                exportedNames,
                identifier(localName),
              ),
            );
          }
        });

        if (items.length > 0) {
          let node: t.Node = sequenceExpression(items);
          if (path.parentPath.isExpressionStatement()) {
            node = expressionStatement(node);
            // @ts-expect-error todo(flow->ts): avoid mutations
            node._blockHoist = path.parentPath.node._blockHoist;
          }

          const statement = path.insertAfter(node)[0];
          requeueInParent(statement);
        }
      }
    },
  },
  "ForOfStatement|ForInStatement"(
    path: NodePath<t.ForOfStatement | t.ForInStatement>,
  ) {
    const { scope, node } = path;
    const { left } = node;
    const { exported, imported, scope: programScope } = this;

    if (!isVariableDeclaration(left)) {
      let didTransformExport = false,
        importConstViolationName;
      const loopBodyScope = path.get("body").scope;
      for (const name of Object.keys(getOuterBindingIdentifiers(left))) {
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
      const bodyPath = path.get("body");

      const newLoopId = scope.generateUidIdentifierBasedOnNode(left);
      path
        .get("left")
        .replaceWith(
          variableDeclaration("let", [
            variableDeclarator(cloneNode(newLoopId)),
          ]),
        );
      scope.registerDeclaration(path.get("left"));

      if (didTransformExport) {
        bodyPath.unshiftContainer(
          "body",
          expressionStatement(assignmentExpression("=", left, newLoopId)),
        );
      }
      if (importConstViolationName) {
        bodyPath.unshiftContainer(
          "body",
          expressionStatement(buildImportThrow(importConstViolationName)),
        );
      }
    }
  },
};
