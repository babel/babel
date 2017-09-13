import { basename, extname } from "path";

import * as t from "babel-types";

export type ModuleMetadata = {
  exportName: string,

  // The name of the variable that will reference an object containing export names.
  exportNameListName: null | string,

  // Lookup from local binding to export information.
  local: Map<string, LocalExportMetadata>,

  // Lookup of source file to source file metadata.
  source: Map<string, SourceModuleMetadata>,
};

export type InteropType = "default" | "namespace" | "none";

export type SourceModuleMetadata = {
  // A unique variable name to use for this namespace object. Centralized for simplicity.
  name: string,

  loc: ?BabelNodeSourceLocation,

  interop: InteropType,

  // Local binding to reference from this source namespace. Key: Local name, value: Import name
  imports: Map<string, string>,

  // Local names that reference namespace object.
  importsNamespace: Set<string>,

  // Reexports to create for namespace. Key: Export name, value: Import name
  reexports: Map<string, string>,

  // List of names to re-export namespace as.
  reexportNamespace: Set<string>,

  // Tracks if the source should be re-exported.
  reexportAll: null | {
    loc: ?BabelNodeSourceLocation,
  },
};

export type LocalExportMetadata = {
  name: Array<string>, // names of exports
  kind: "import" | "hoisted" | "block" | "var",
};

/**
 * Check if the module has any exports that need handling.
 */
export function hasExports(metadata: ModuleMetadata) {
  const { local, source } = metadata;

  return (
    local.size > 0 ||
    Array.from(source).some(([, meta]) => {
      return (
        meta.reexports.size > 0 ||
        meta.reexportNamespace.size > 0 ||
        !!meta.reexportAll
      );
    })
  );
}

/**
 * Check if a given source is an anonymous import, e.g. "import 'foo';"
 */
export function isSideEffectImport(source: SourceModuleMetadata) {
  return (
    source.imports.size === 0 &&
    source.importsNamespace.size === 0 &&
    source.reexports.size === 0 &&
    source.reexportNamespace.size === 0 &&
    !source.reexportAll
  );
}

/**
 * Remove all imports and exports from the file, and return all metadata
 * needed to reconstruct the module's behavior.
 */
export default function normalizeModuleAndLoadMetadata(
  programPath: NodePath,
  exportName?: string,
  { strict = false, noInterop = false } = {},
): ModuleMetadata {
  if (!exportName) {
    exportName = programPath.scope.generateUidIdentifier("exports").name;
  }

  nameAnonymousExports(programPath);

  const { local, source } = getModuleMetadata(programPath, strict);

  removeModuleDeclarations(programPath);

  // Reuse the imported namespace name if there is one.
  for (const [, metadata] of source) {
    if (metadata.importsNamespace.size > 0) {
      // This is kind of gross. If we stop using `loose: true` we should
      // just make this destructuring assignment.
      metadata.name = metadata.importsNamespace.values().next().value;
    }

    if (noInterop) metadata.interop = "none";
  }

  return {
    exportName,
    exportNameListName: null,
    local,
    source,
  };
}

/**
 * Get metadata about the imports and exports present in this module.
 */
function getModuleMetadata(programPath: NodePath, strict: boolean = false) {
  const localData = getLocalExportMetadata(programPath);

  const sourceData = new Map();
  const getData = sourceNode => {
    const source = sourceNode.value;

    let data = sourceData.get(source);
    if (!data) {
      data = {
        name: programPath.scope.generateUidIdentifier(
          basename(source, extname(source)),
        ).name,

        interop: "none",

        loc: null,

        // Data about the requested sources and names.
        imports: new Map(),
        importsNamespace: new Set(),

        // Metadata about data that is passed directly from source to export.
        reexports: new Map(),
        reexportNamespace: new Set(),
        reexportAll: null,
      };
      sourceData.set(source, data);
    }
    return data;
  };
  programPath.get("body").forEach(child => {
    if (child.isImportDeclaration()) {
      const data = getData(child.node.source);
      if (!data.loc) data.loc = child.node.loc;

      child.get("specifiers").forEach(spec => {
        if (spec.isImportDefaultSpecifier()) {
          if (data.interop === "none") data.interop = "default";

          const localName = spec.get("local").node.name;

          data.imports.set(localName, "default");

          const reexport = localData.get(localName);
          if (reexport) {
            localData.delete(localName);

            reexport.names.forEach(name => {
              data.reexports.set(name, "default");
            });
          }
        } else if (spec.isImportNamespaceSpecifier()) {
          const localName = spec.get("local").node.name;

          if (!strict) data.interop = "namespace";

          data.importsNamespace.add(localName);
          const reexport = localData.get(localName);
          if (reexport) {
            localData.delete(localName);

            reexport.names.forEach(name => {
              data.reexportNamespace.add(name);
            });
          }
        } else if (spec.isImportSpecifier()) {
          const importName = spec.get("imported").node.name;
          const localName = spec.get("local").node.name;

          data.imports.set(localName, importName);

          if (importName === "default" && data.interop === "none") {
            data.interop = "default";
          }

          const reexport = localData.get(localName);
          if (reexport) {
            localData.delete(localName);

            reexport.names.forEach(name => {
              data.reexports.set(name, importName);
            });
          }
        }
      });
    } else if (child.isExportAllDeclaration()) {
      const data = getData(child.node.source);
      if (!data.loc) data.loc = child.node.loc;

      data.reexportAll = {
        loc: child.node.loc,
      };
    } else if (child.isExportNamedDeclaration() && child.node.source) {
      const data = getData(child.node.source);
      if (!data.loc) data.loc = child.node.loc;

      child.get("specifiers").forEach(spec => {
        if (!spec.isExportSpecifier()) {
          throw spec.buildCodeFrameError("Unexpected export specifier type");
        }
        const importName = spec.get("local").node.name;
        const exportName = spec.get("exported").node.name;

        if (importName === "default" && data.interop === "none") {
          data.interop = "default";
        }

        data.reexports.set(exportName, importName);

        if (exportName === "__esModule") {
          throw exportName.buildCodeFrameError('Illegal export "__esModule".');
        }
      });
    }
  });

  return {
    local: localData,
    source: sourceData,
  };
}

/**
 * Get metadata about local variables that are exported.
 */
function getLocalExportMetadata(
  programPath: NodePath,
): Map<string, LocalExportMetadata> {
  const bindingKindLookup = new Map();

  programPath.get("body").forEach(child => {
    let kind;
    if (child.isImportDeclaration()) {
      kind = "import";
    } else {
      if (child.isExportDefaultDeclaration()) child = child.get("declaration");
      if (child.isExportNamedDeclaration() && child.node.declaration) {
        child = child.get("declaration");
      }

      if (child.isFunctionDeclaration()) {
        kind = "hoisted";
      } else if (child.isClassDeclaration()) {
        kind = "block";
      } else if (child.isVariableDeclaration({ kind: "var" })) {
        kind = "var";
      } else if (child.isVariableDeclaration()) {
        kind = "block";
      } else {
        return;
      }
    }

    Object.keys(child.getOuterBindingIdentifiers()).forEach(name => {
      bindingKindLookup.set(name, kind);
    });
  });

  const localMetadata = new Map();
  const getLocalMetadata = idPath => {
    const localName = idPath.node.name;
    let metadata = localMetadata.get(localName);
    if (!metadata) {
      const kind = bindingKindLookup.get(localName);

      if (kind === undefined) {
        throw idPath.buildCodeFrameError(
          `Exporting local "${localName}", which is not declared.`,
        );
      }

      metadata = {
        names: [],
        kind,
      };
      localMetadata.set(localName, metadata);
    }
    return metadata;
  };

  programPath.get("body").forEach(child => {
    if (child.isExportNamedDeclaration() && !child.node.source) {
      if (child.node.declaration) {
        const declaration = child.get("declaration");
        const ids = declaration.getOuterBindingIdentifierPaths();
        Object.keys(ids).forEach(name => {
          if (name === "__esModule") {
            throw declaration.buildCodeFrameError(
              'Illegal export "__esModule".',
            );
          }

          getLocalMetadata(ids[name]).names.push(name);
        });
      } else {
        child.get("specifiers").forEach(spec => {
          const local = spec.get("local");
          const exported = spec.get("exported");

          if (exported.node.name === "__esModule") {
            throw exported.buildCodeFrameError('Illegal export "__esModule".');
          }

          getLocalMetadata(local).names.push(exported.node.name);
        });
      }
    } else if (child.isExportDefaultDeclaration()) {
      const declaration = child.get("declaration");
      if (
        declaration.isFunctionDeclaration() ||
        declaration.isClassDeclaration()
      ) {
        getLocalMetadata(declaration.get("id")).names.push("default");
      } else {
        // These should have been removed by the nameAnonymousExports() call.
        throw declaration.buildCodeFrameError(
          "Unexpected default expression export.",
        );
      }
    }
  });

  return localMetadata;
}

/**
 * Ensure that all exported values have local binding names.
 */
function nameAnonymousExports(programPath: NodePath) {
  // Name anonymous exported locals.
  programPath.get("body").forEach(child => {
    if (!child.isExportDefaultDeclaration()) return;

    // export default foo;
    const declaration = child.get("declaration");
    if (declaration.isFunctionDeclaration()) {
      if (!declaration.node.id) {
        declaration.node.id = declaration.scope.generateUidIdentifier(
          "default",
        );
      }
    } else if (declaration.isClassDeclaration()) {
      if (!declaration.node.id) {
        declaration.node.id = declaration.scope.generateUidIdentifier(
          "default",
        );
      }
    } else {
      const id = declaration.scope.generateUidIdentifier("default");
      const namedDecl = t.exportNamedDeclaration(null, [
        t.exportSpecifier(t.identifier(id.name), t.identifier("default")),
      ]);
      namedDecl._blockHoist = child.node._blockHoist;

      const varDecl = t.variableDeclaration("var", [
        t.variableDeclarator(id, declaration.node),
      ]);
      varDecl._blockHoist = child.node._blockHoist;

      child.replaceWithMultiple([namedDecl, varDecl]);
    }
  });
}

function removeModuleDeclarations(programPath: NodePath) {
  programPath.get("body").forEach(child => {
    if (child.isImportDeclaration()) {
      child.remove();
    } else if (child.isExportNamedDeclaration()) {
      if (child.node.declaration) {
        child.node.declaration._blockHoist = child.node._blockHoist;
        child.replaceWith(child.node.declaration);
      } else {
        child.remove();
      }
    } else if (child.isExportDefaultDeclaration()) {
      // export default foo;
      const declaration = child.get("declaration");
      if (
        declaration.isFunctionDeclaration() ||
        declaration.isClassDeclaration()
      ) {
        declaration._blockHoist = child.node._blockHoist;
        child.replaceWith(declaration);
      } else {
        // These should have been removed by the nameAnonymousExports() call.
        throw declaration.buildCodeFrameError(
          "Unexpected default expression export.",
        );
      }
    } else if (child.isExportAllDeclaration()) {
      child.remove();
    }
  });
}
