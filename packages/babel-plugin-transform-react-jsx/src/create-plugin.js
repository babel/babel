import jsx from "@babel/plugin-syntax-jsx";
import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
import { addNamed, addNamespace, isModule } from "@babel/helper-module-imports";

import { helper } from "./helper";

const DEFAULT = {
  importSource: "react",
  runtime: "automatic",
  pragma: "React.createElement",
  pragmaFrag: "React.Fragment",
};

const JSX_SOURCE_ANNOTATION_REGEX = /\*?\s*@jsxImportSource\s+([^\s]+)/;
const JSX_RUNTIME_ANNOTATION_REGEX = /\*?\s*@jsxRuntime\s+([^\s]+)/;

const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;
const JSX_FRAG_ANNOTATION_REGEX = /\*?\s*@jsxFrag\s+([^\s]+)/;

const get = (pass, name) => pass.get(`@babel/plugin-react-jsx/${name}`);
const set = (pass, name, v) => pass.set(`@babel/plugin-react-jsx/${name}`, v);

export default function createPlugin({ name, development }) {
  return declare((api, options) => {
    const {
      pure: PURE_ANNOTATION,

      throwIfNamespace = true,
      filter,

      // TODO (Babel 8): Remove `useBuiltIns` & `useSpread`
      useSpread = false,
      useBuiltIns = false,

      runtime: RUNTIME_DEFAULT = development ? "automatic" : "classic",

      importSource: IMPORT_SOURCE_DEFAULT = DEFAULT.importSource,
      pragma: PRAGMA_DEFAULT = DEFAULT.pragma,
      pragmaFrag: PRAGMA_FRAG_DEFAULT = DEFAULT.pragmaFrag,
    } = options;

    // TOOD(Babel 8): If the runtime is 'automatic', we should throw when useSpread/useBuiltIns are set
    if (RUNTIME_DEFAULT === "classic") {
      if (typeof useSpread !== "boolean") {
        throw new Error(
          "transform-react-jsx currently only accepts a boolean option for " +
            "useSpread (defaults to false)",
        );
      }

      if (typeof useBuiltIns !== "boolean") {
        throw new Error(
          "transform-react-jsx currently only accepts a boolean option for " +
            "useBuiltIns (defaults to false)",
        );
      }

      if (useSpread && useBuiltIns) {
        throw new Error(
          "transform-react-jsx currently only accepts useBuiltIns or useSpread " +
            "but not both",
        );
      }
    }

    const visitor = helper({
      development,

      filter,
      useSpread,
      useBuiltIns,

      RUNTIME_DEFAULT,

      pre(state) {
        const tagName = state.tagName;
        const args = state.args;
        if (t.react.isCompatTag(tagName)) {
          args.push(t.stringLiteral(tagName));
        } else {
          args.push(state.tagExpr);
        }
      },

      post(state, pass) {
        if (get(pass, "runtime") === "classic" && !development) {
          // TODO(Babel 8): We should throw if we are using the classic runtime in dev

          state.createElementCallee = get(pass, "createElementIdentifier")();
          state.pure = PURE_ANNOTATION ?? !get(pass, "pragmaSet");
        } else {
          const getter = get => ({ enumerable: true, configurable: true, get });

          // TODO(Babel 8): helper-builder-react-jsx expects those properties to be AST nodes, but we want to
          // generate them lazily so that we only inject imports when needed.
          // These should actually be functions.
          Object.defineProperties(state, {
            jsxCallee: getter(get(pass, "jsxIdentifier")),
            jsxStaticCallee: getter(get(pass, "jsxStaticIdentifier")),
            createElementCallee: getter(get(pass, "createElementIdentifier")),
          });

          state.pure = PURE_ANNOTATION ?? !get(pass, "importSourceSet");
        }
      },
    });

    const injectMetaPropertiesVisitor = {
      JSXOpeningElement(path, state) {
        for (const attr of path.get("attributes")) {
          if (!attr.isJSXElement()) continue;

          const { name } = attr.node.name;
          if (name === "__source" || name === "__self") {
            throw path.buildCodeFrameError(
              `__source and __self should not be defined in props and are reserved for internal usage.`,
            );
          }
        }

        const self = t.jsxAttribute(
          t.jsxIdentifier("__self"),
          t.jsxExpressionContainer(t.thisExpression()),
        );
        const source = t.jsxAttribute(
          t.jsxIdentifier("__source"),
          t.jsxExpressionContainer(makeSource(path, state)),
        );

        path.pushContainer("attributes", [self, source]);
      },
    };

    return {
      name,
      inherits: jsx,
      visitor: {
        JSXNamespacedName(path) {
          if (throwIfNamespace) {
            throw path.buildCodeFrameError(
              `Namespace tags are not supported by default. React's JSX doesn't support namespace tags. \
You can set \`throwIfNamespace: false\` to bypass this warning.`,
            );
          }
        },

        JSXSpreadChild(path) {
          throw path.buildCodeFrameError(
            "Spread children are not supported in React.",
          );
        },

        Program: {
          enter(path, state) {
            const { file } = state;
            let runtime = RUNTIME_DEFAULT;

            let source = IMPORT_SOURCE_DEFAULT;
            let pragma = PRAGMA_DEFAULT;
            let pragmaFrag = PRAGMA_FRAG_DEFAULT;

            let sourceSet = !!options.importSource;
            let pragmaSet = !!options.pragma;
            let pragmaFragSet = !!options.pragmaFrag;

            if (file.ast.comments) {
              for (const comment of (file.ast.comments: Array<Object>)) {
                const sourceMatches = JSX_SOURCE_ANNOTATION_REGEX.exec(
                  comment.value,
                );
                if (sourceMatches) {
                  source = sourceMatches[1];
                  sourceSet = true;
                }

                const runtimeMatches = JSX_RUNTIME_ANNOTATION_REGEX.exec(
                  comment.value,
                );
                if (runtimeMatches) {
                  runtime = runtimeMatches[1];
                }

                const jsxMatches = JSX_ANNOTATION_REGEX.exec(comment.value);
                if (jsxMatches) {
                  pragma = jsxMatches[1];
                  pragmaSet = true;
                }
                const jsxFragMatches = JSX_FRAG_ANNOTATION_REGEX.exec(
                  comment.value,
                );
                if (jsxFragMatches) {
                  pragmaFrag = jsxFragMatches[1];
                  pragmaFragSet = true;
                }
              }
            }

            set(state, "runtime", runtime);
            if (runtime === "classic") {
              if (sourceSet) {
                throw path.buildCodeFrameError(
                  `importSource cannot be set when runtime is classic.`,
                );
              }
              set(
                state,
                "createElementIdentifier",
                createIdentifierParser(pragma),
              );
              set(
                state,
                "jsxFragIdentifier",
                createIdentifierParser(pragmaFrag),
              );
              set(state, "usedFragment", false);
              set(state, "pragmaSet", pragma !== DEFAULT.pragma);
              set(state, "pragmaFragSet", pragmaFrag !== DEFAULT.pragmaFrag);
            } else if (runtime === "automatic") {
              if (pragmaSet || pragmaFragSet) {
                throw path.buildCodeFrameError(
                  `pragma and pragmaFrag cannot be set when runtime is automatic.`,
                );
              }

              set(
                state,
                "jsxIdentifier",
                createImportLazily(
                  state,
                  path,
                  development ? "jsxDEV" : "jsx",
                  source,
                ),
              );
              set(
                state,
                "jsxStaticIdentifier",
                createImportLazily(
                  state,
                  path,
                  development ? "jsxDEV" : "jsxs",
                  source,
                ),
              );

              set(
                state,
                "createElementIdentifier",
                createImportLazily(state, path, "createElement", source),
              );

              set(
                state,
                "jsxFragIdentifier",
                createImportLazily(state, path, "Fragment", source),
              );

              set(state, "importSourceSet", source !== DEFAULT.importSource);
            } else {
              throw path.buildCodeFrameError(
                `Runtime must be either "classic" or "automatic".`,
              );
            }

            if (development) {
              path.traverse(injectMetaPropertiesVisitor, state);
            }
          },

          // TODO (Babel 8): Decide if this should be removed or brought back.
          // see: https://github.com/babel/babel/pull/12253#discussion_r513086528
          //
          // exit(path, state) {
          //   if (
          //     get(state, "runtime") === "classic" &&
          //     get(state, "pragmaSet") &&
          //     get(state, "usedFragment") &&
          //     !get(state, "pragmaFragSet")
          //   ) {
          //     throw new Error(
          //       "transform-react-jsx: pragma has been set but " +
          //         "pragmaFrag has not been set",
          //     );
          //   }
          // },
        },

        ...visitor,
      },
    };
  });

  function getSource(source, importName) {
    switch (importName) {
      case "Fragment":
        return `${source}/${development ? "jsx-dev-runtime" : "jsx-runtime"}`;
      case "jsxDEV":
        return `${source}/jsx-dev-runtime`;
      case "jsx":
      case "jsxs":
        return `${source}/jsx-runtime`;
      case "createElement":
        return source;
    }
  }

  function createImportLazily(pass, path, importName, source) {
    return () => {
      const actualSource = getSource(source, importName);
      if (isModule(path)) {
        let reference = get(pass, `imports/${importName}`);
        if (reference) return t.cloneNode(reference);

        reference = addNamed(path, importName, actualSource, {
          importedInterop: "uncompiled",
        });
        set(pass, `imports/${importName}`, reference);

        return reference;
      } else {
        let reference = get(pass, `requires/${actualSource}`);
        if (reference) {
          reference = t.cloneNode(reference);
        } else {
          reference = addNamespace(path, actualSource, {
            importedInterop: "uncompiled",
          });
          set(pass, `requires/${actualSource}`, reference);
        }

        return t.memberExpression(reference, t.identifier(importName));
      }
    };
  }
}

function createIdentifierParser(id) {
  return () => {
    return id
      .split(".")
      .map(name => t.identifier(name))
      .reduce((object, property) => t.memberExpression(object, property));
  };
}

function makeSource(path, state) {
  const location = path.node.loc;
  if (!location) {
    // the element was generated and doesn't have location information
    return path.scope.buildUndefinedNode();
  }

  if (!state.fileNameIdentifier) {
    const { filename = "" } = state;

    const fileNameIdentifier = path.scope.generateUidIdentifier("_jsxFileName");
    const scope = path.hub.getScope();
    if (scope) {
      scope.push({
        id: fileNameIdentifier,
        init: t.stringLiteral(filename),
      });
    }
    state.fileNameIdentifier = fileNameIdentifier;
  }

  return makeTrace(
    t.cloneNode(state.fileNameIdentifier),
    location.start.line,
    location.start.column,
  );
}

function makeTrace(fileNameIdentifier, lineNumber, column0Based) {
  const fileLineLiteral =
    lineNumber != null ? t.numericLiteral(lineNumber) : t.nullLiteral();

  const fileColumnLiteral =
    column0Based != null ? t.numericLiteral(column0Based + 1) : t.nullLiteral();

  const fileNameProperty = t.objectProperty(
    t.identifier("fileName"),
    fileNameIdentifier,
  );
  const lineNumberProperty = t.objectProperty(
    t.identifier("lineNumber"),
    fileLineLiteral,
  );
  const columnNumberProperty = t.objectProperty(
    t.identifier("columnNumber"),
    fileColumnLiteral,
  );
  return t.objectExpression([
    fileNameProperty,
    lineNumberProperty,
    columnNumberProperty,
  ]);
}
