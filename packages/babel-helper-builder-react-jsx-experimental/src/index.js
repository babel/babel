import * as t from "@babel/types";
import { addNamed, addNamespace, isModule } from "@babel/helper-module-imports";
import annotateAsPure from "@babel/helper-annotate-as-pure";

const DEFAULT = {
  importSource: "react",
  runtime: "automatic",
  pragma: "React.createElement",
  pragmaFrag: "React.Fragment",
};

export function helper(babel, options) {
  // TODO (Babel 8): Remove `useBuiltIns` & `useSpread`
  const { useSpread = false, useBuiltIns = false } = options;
  if (options.runtime === "classic") {
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

  const FILE_NAME_VAR = "_jsxFileName";

  const JSX_SOURCE_ANNOTATION_REGEX = /\*?\s*@jsxImportSource\s+([^\s]+)/;
  const JSX_RUNTIME_ANNOTATION_REGEX = /\*?\s*@jsxRuntime\s+([^\s]+)/;

  const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;
  const JSX_FRAG_ANNOTATION_REGEX = /\*?\s*@jsxFrag\s+([^\s]+)/;

  const {
    importSource: IMPORT_SOURCE_DEFAULT = DEFAULT.importSource,
    runtime: RUNTIME_DEFAULT = DEFAULT.runtime,
    pragma: PRAGMA_DEFAULT = DEFAULT.pragma,
    pragmaFrag: PRAGMA_FRAG_DEFAULT = DEFAULT.pragmaFrag,
  } = options;

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
    JSXNamespacedName(path, state) {
      const throwIfNamespace =
        state.opts.throwIfNamespace === undefined
          ? true
          : !!state.opts.throwIfNamespace;
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

    JSXElement: {
      exit(path, file) {
        let callExpr;
        if (
          file.get("@babel/plugin-react-jsx/runtime") === "classic" ||
          shouldUseCreateElement(path)
        ) {
          callExpr = buildCreateElementCall(path, file);
        } else {
          callExpr = buildJSXElementCall(path, file);
        }

        path.replaceWith(t.inherits(callExpr, path.node));
      },
    },

    JSXFragment: {
      exit(path, file) {
        let callExpr;
        if (file.get("@babel/plugin-react-jsx/runtime") === "classic") {
          callExpr = buildCreateElementFragmentCall(path, file);
        } else {
          callExpr = buildJSXFragmentCall(path, file);
        }

        path.replaceWith(t.inherits(callExpr, path.node));
      },
    },

    JSXAttribute(path) {
      if (t.isJSXElement(path.node.value)) {
        path.node.value = t.jsxExpressionContainer(path.node.value);
      }
    },

    Program: {
      enter(path, state) {
        const { file } = state;
        let runtime = RUNTIME_DEFAULT;

        // For jsx mode
        let source = IMPORT_SOURCE_DEFAULT;
        let sourceSet = !!options.importSource;

        // For createElement mode
        let pragma = PRAGMA_DEFAULT;
        let pragmaFrag = PRAGMA_FRAG_DEFAULT;
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

        state.set("@babel/plugin-react-jsx/runtime", runtime);
        if (runtime === "classic") {
          if (sourceSet) {
            throw path.buildCodeFrameError(
              `importSource cannot be set when runtime is classic.`,
            );
          }
          state.set(
            "@babel/plugin-react-jsx/createElementIdentifier",
            createIdentifierParser(pragma),
          );
          state.set(
            "@babel/plugin-react-jsx/jsxFragIdentifier",
            createIdentifierParser(pragmaFrag),
          );
          state.set("@babel/plugin-react-jsx/usedFragment", false);
          state.set(
            "@babel/plugin-react-jsx/pragmaSet",
            pragma !== DEFAULT.pragma,
          );
          state.set(
            "@babel/plugin-react-jsx/pragmaFragSet",
            pragmaFrag !== DEFAULT.pragmaFrag,
          );
        } else if (runtime === "automatic") {
          if (pragmaSet || pragmaFragSet) {
            throw path.buildCodeFrameError(
              `pragma and pragmaFrag cannot be set when runtime is automatic.`,
            );
          }

          state.set(
            "@babel/plugin-react-jsx/jsxIdentifier",
            createImportLazily(
              state,
              path,
              options.development ? "jsxDEV" : "jsx",
              source,
            ),
          );
          state.set(
            "@babel/plugin-react-jsx/jsxStaticIdentifier",
            createImportLazily(
              state,
              path,
              options.development ? "jsxDEV" : "jsxs",
              source,
            ),
          );

          state.set(
            "@babel/plugin-react-jsx/createElementIdentifier",
            createImportLazily(state, path, "createElement", source),
          );

          state.set(
            "@babel/plugin-react-jsx/jsxFragIdentifier",
            createImportLazily(state, path, "Fragment", source),
          );

          state.set(
            "@babel/plugin-react-jsx/importSourceSet",
            source !== DEFAULT.importSource,
          );
        } else {
          throw path.buildCodeFrameError(
            `Runtime must be either "classic" or "automatic".`,
          );
        }

        if (options.development) {
          path.traverse(injectMetaPropertiesVisitor, state);
        }
      },

      // TODO (Babel 8): Decide if this should be removed or brought back.
      // see: https://github.com/babel/babel/pull/12253#discussion_r513086528
      //
      // exit(path, state) {
      //   if (
      //     state.get("@babel/plugin-react-jsx/runtime") === "classic" &&
      //     state.get("@babel/plugin-react-jsx/pragmaSet") &&
      //     state.get("@babel/plugin-react-jsx/usedFragment") &&
      //     !state.get("@babel/plugin-react-jsx/pragmaFragSet")
      //   ) {
      //     throw new Error(
      //       "transform-react-jsx: pragma has been set but " +
      //         "pragmaFrag has not been set",
      //     );
      //   }
      // },
    },
  };

  // We want to use React.createElement, even in the case of
  // jsx, for <div {...props} key={key} /> to distinguish it
  // from <div key={key} {...props} />. This is an intermediary
  // step while we deprecate key spread from props. Afterwards,
  // we will stop using createElement in the transform.
  function shouldUseCreateElement(path) {
    const openingPath = path.get("openingElement");
    const attributes = openingPath.node.attributes;

    let seenPropsSpread = false;
    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      if (
        seenPropsSpread &&
        t.isJSXAttribute(attr) &&
        attr.name.name === "key"
      ) {
        return true;
      } else if (t.isJSXSpreadAttribute(attr)) {
        seenPropsSpread = true;
      }
    }
    return false;
  }

  function getSource(source, importName) {
    switch (importName) {
      case "Fragment":
        return `${source}/${
          options.development ? "jsx-dev-runtime" : "jsx-runtime"
        }`;
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
        let reference = pass.get(
          `@babel/plugin-react-jsx/imports/${importName}`,
        );
        if (reference) return t.cloneNode(reference);

        reference = addNamed(path, importName, actualSource, {
          importedInterop: "uncompiled",
        });
        pass.set(`@babel/plugin-react-jsx/imports/${importName}`, reference);

        return reference;
      } else {
        let reference = pass.get(
          `@babel/plugin-react-jsx/requires/${actualSource}`,
        );
        if (reference) {
          reference = t.cloneNode(reference);
        } else {
          reference = addNamespace(path, actualSource, {
            importedInterop: "uncompiled",
          });
          pass.set(
            `@babel/plugin-react-jsx/requires/${actualSource}`,
            reference,
          );
        }

        return t.memberExpression(reference, t.identifier(importName));
      }
    };
  }

  function createIdentifierParser(id) {
    return () => {
      return id
        .split(".")
        .map(name => t.identifier(name))
        .reduce((object, property) => t.memberExpression(object, property));
    };
  }

  function makeTrace(fileNameIdentifier, lineNumber, column0Based) {
    const fileLineLiteral =
      lineNumber != null ? t.numericLiteral(lineNumber) : t.nullLiteral();

    const fileColumnLiteral =
      column0Based != null
        ? t.numericLiteral(column0Based + 1)
        : t.nullLiteral();

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

  function makeSource(path, state) {
    const location = path.node.loc;
    if (!location) {
      // the element was generated and doesn't have location information
      return path.scope.buildUndefinedNode();
    }

    if (!state.fileNameIdentifier) {
      const { filename = "" } = state;

      const fileNameIdentifier = path.scope.generateUidIdentifier(
        FILE_NAME_VAR,
      );
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

  function convertJSXIdentifier(node, parent) {
    if (t.isJSXIdentifier(node)) {
      if (node.name === "this" && t.isReferenced(node, parent)) {
        return t.thisExpression();
      } else if (t.isValidIdentifier(node.name, false)) {
        node.type = "Identifier";
      } else {
        return t.stringLiteral(node.name);
      }
    } else if (t.isJSXMemberExpression(node)) {
      return t.memberExpression(
        convertJSXIdentifier(node.object, node),
        convertJSXIdentifier(node.property, node),
      );
    } else if (t.isJSXNamespacedName(node)) {
      /**
       * If the flag "throwIfNamespace" is false
       * print XMLNamespace like string literal
       */
      return t.stringLiteral(`${node.namespace.name}:${node.name.name}`);
    }

    return node;
  }

  function convertAttributeValue(node) {
    if (t.isJSXExpressionContainer(node)) {
      return node.expression;
    } else {
      return node;
    }
  }

  function convertAttribute(node) {
    const value = convertAttributeValue(node.value || t.booleanLiteral(true));

    if (t.isJSXSpreadAttribute(node)) {
      return t.spreadElement(node.argument);
    }

    if (t.isStringLiteral(value) && !t.isJSXExpressionContainer(node.value)) {
      value.value = value.value.replace(/\n\s+/g, " ");

      // "raw" JSXText should not be used from a StringLiteral because it needs to be escaped.
      if (value.extra && value.extra.raw) {
        delete value.extra.raw;
      }
    }

    if (t.isJSXNamespacedName(node.name)) {
      node.name = t.stringLiteral(
        node.name.namespace.name + ":" + node.name.name.name,
      );
    } else if (t.isValidIdentifier(node.name.name, false)) {
      node.name.type = "Identifier";
    } else {
      node.name = t.stringLiteral(node.name.name);
    }

    return t.inherits(t.objectProperty(node.name, value), node);
  }

  // Builds JSX into:
  // Production: React.jsx(type, arguments, key)
  // Development: React.jsxDEV(type, arguments, key, isStaticChildren, source, self)
  function buildJSXElementCall(path, file) {
    const openingPath = path.get("openingElement");
    openingPath.parent.children = t.react.buildChildren(openingPath.parent);

    const tagExpr = convertJSXIdentifier(
      openingPath.node.name,
      openingPath.node,
    );
    const args = [];

    let tagName;
    if (t.isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (t.isLiteral(tagExpr)) {
      tagName = tagExpr.value;
    }

    const state = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args,
      pure: false,
    };

    if (options.pre) {
      options.pre(state, file);
    }

    let attribs = [];
    const extracted = Object.create(null);

    // for React.jsx, key, __source (dev), and __self (dev) is passed in as
    // a separate argument rather than in the args object. We go through the
    // props and filter out these three keywords so we can pass them in
    // as separate arguments later
    for (const attr of openingPath.get("attributes")) {
      if (attr.isJSXAttribute() && t.isJSXIdentifier(attr.node.name)) {
        const { name } = attr.node.name;
        switch (name) {
          case "__source":
          case "__self":
            if (extracted[name]) throw sourceSelfError(path, name);
          /* falls through */
          case "key":
            extracted[name] = convertAttributeValue(attr.node.value);
            break;
          default:
            attribs.push(attr.node);
        }
      } else {
        attribs.push(attr.node);
      }
    }

    if (attribs.length || path.node.children.length) {
      attribs = buildJSXOpeningElementAttributes(
        attribs,
        file,
        path.node.children,
      );
    } else {
      // attributes should never be null
      attribs = t.objectExpression([]);
    }

    args.push(attribs);

    if (!options.development) {
      if (extracted.key !== undefined) {
        args.push(extracted.key);
      }
    } else {
      // isStaticChildren, __source, and __self are only used in development
      // automatically include __source and __self in this plugin
      // so we can eliminate the need for separate Babel plugins in Babel 8
      args.push(
        extracted.key ?? path.scope.buildUndefinedNode(),
        t.booleanLiteral(path.node.children.length > 1),
        extracted.__source ?? path.scope.buildUndefinedNode(),
        extracted.__self ?? t.thisExpression(),
      );
    }

    if (options.post) {
      options.post(state, file);
    }

    const call =
      state.call ||
      t.callExpression(
        path.node.children.length > 1 ? state.jsxStaticCallee : state.jsxCallee,
        args,
      );
    if (state.pure) annotateAsPure(call);

    return call;
  }

  // Builds props for React.jsx. This function adds children into the props
  // and ensures that props is always an object
  function buildJSXOpeningElementAttributes(attribs, file, children) {
    const props = attribs.map(convertAttribute);

    // In React.jsx, children is no longer a separate argument, but passed in
    // through the argument object
    if (children && children.length > 0) {
      if (children.length === 1) {
        props.push(t.objectProperty(t.identifier("children"), children[0]));
      } else {
        props.push(
          t.objectProperty(
            t.identifier("children"),
            t.arrayExpression(children),
          ),
        );
      }
    }

    return t.objectExpression(props);
  }

  // Builds JSX Fragment <></> into
  // Production: React.jsx(type, arguments)
  // Development: React.jsxDEV(type, { children})
  function buildJSXFragmentCall(path, file) {
    const openingPath = path.get("openingElement");
    openingPath.parent.children = t.react.buildChildren(openingPath.parent);

    const args = [];
    const tagName = null;
    const tagExpr = file.get("@babel/plugin-react-jsx/jsxFragIdentifier")();

    const state = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args,
      pure: false,
    };

    if (options.pre) {
      options.pre(state, file);
    }

    let childrenNode;
    if (path.node.children.length > 0) {
      if (path.node.children.length === 1) {
        childrenNode = path.node.children[0];
      } else {
        childrenNode = t.arrayExpression(path.node.children);
      }
    }

    args.push(
      t.objectExpression(
        childrenNode !== undefined
          ? [t.objectProperty(t.identifier("children"), childrenNode)]
          : [],
      ),
    );

    if (options.development) {
      args.push(
        path.scope.buildUndefinedNode(),
        t.booleanLiteral(path.node.children.length > 1),
      );
    }

    if (options.post) {
      options.post(state, file);
    }

    const call =
      state.call ||
      t.callExpression(
        path.node.children.length > 1 ? state.jsxStaticCallee : state.jsxCallee,
        args,
      );
    if (state.pure) annotateAsPure(call);

    return call;
  }

  function buildCreateElementFragmentCall(path, file) {
    if (options.filter && !options.filter(path.node, file)) {
      return;
    }

    const openingPath = path.get("openingElement");
    openingPath.parent.children = t.react.buildChildren(openingPath.parent);

    const args = [];
    const tagName = null;
    const tagExpr = file.get("@babel/plugin-react-jsx/jsxFragIdentifier")();

    const state = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args,
      pure: false,
    };

    if (options.pre) {
      options.pre(state, file);
    }

    // no attributes are allowed with <> syntax
    args.push(t.nullLiteral(), ...path.node.children);

    if (options.post) {
      options.post(state, file);
    }

    file.set("@babel/plugin-react-jsx/usedFragment", true);

    const call =
      state.call || t.callExpression(state.createElementCallee, args);
    if (state.pure) annotateAsPure(call);

    return call;
  }

  // Builds JSX into:
  // Production: React.createElement(type, arguments, children)
  // Development: React.createElement(type, arguments, children, source, self)
  function buildCreateElementCall(path, file) {
    const openingPath = path.get("openingElement");
    openingPath.parent.children = t.react.buildChildren(openingPath.parent);

    const tagExpr = convertJSXIdentifier(
      openingPath.node.name,
      openingPath.node,
    );
    const args = [];

    let tagName;
    if (t.isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (t.isLiteral(tagExpr)) {
      tagName = tagExpr.value;
    }

    const state = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args,
      pure: false,
    };

    if (options.pre) {
      options.pre(state, file);
    }

    const attribs = buildCreateElementOpeningElementAttributes(
      file,
      path,
      openingPath.node.attributes,
    );

    args.push(attribs, ...path.node.children);

    if (options.post) {
      options.post(state, file);
    }

    const call =
      state.call || t.callExpression(state.createElementCallee, args);
    if (state.pure) annotateAsPure(call);

    return call;
  }

  /**
   * The logic for this is quite terse. It's because we need to
   * support spread elements. We loop over all attributes,
   * breaking on spreads, we then push a new object containing
   * all prior attributes to an array for later processing.
   */
  function buildCreateElementOpeningElementAttributes(file, path, attribs) {
    // TODO (Babel 8): Only leave this branch of the code and remove the rest
    if (
      RUNTIME_DEFAULT === "automatic" ||
      file.get("@babel/plugin-react-jsx/runtime") === "automatic"
    ) {
      const props = [];
      const found = Object.create(null);

      for (const attr of attribs) {
        const name =
          t.isJSXAttribute(attr) &&
          t.isJSXIdentifier(attr.name) &&
          attr.name.name;

        if (name === "__source" || name === "__self") {
          if (found[name]) throw sourceSelfError(path, name);
          found[name] = true;
        }

        props.push(convertAttribute(attr));
      }

      return props.length > 0 ? t.objectExpression(props) : t.nullLiteral();
    }

    let props = [];
    const objs = [];

    for (const attr of attribs) {
      if (useSpread || !t.isJSXSpreadAttribute(attr)) {
        props.push(convertAttribute(attr));
      } else {
        if (props.length) {
          objs.push(t.objectExpression(props));
          props = [];
        }
        objs.push(attr.argument);
      }
    }

    if (!props.length && !objs.length) {
      return t.nullLiteral();
    }

    if (useSpread) {
      return props.length > 0 ? t.objectExpression(props) : t.nullLiteral();
    }

    if (props.length) {
      objs.push(t.objectExpression(props));
      props = [];
    }

    if (objs.length === 1) {
      return objs[0];
    }

    // looks like we have multiple objects
    if (!t.isObjectExpression(objs[0])) {
      objs.unshift(t.objectExpression([]));
    }

    const helper = useBuiltIns
      ? t.memberExpression(t.identifier("Object"), t.identifier("assign"))
      : file.addHelper("extends");

    // spread it
    return t.callExpression(helper, objs);
  }

  function sourceSelfError(path, name) {
    const pluginName = `transform-react-jsx-${name.slice(2)}`;

    return path.buildCodeFrameError(
      `Duplicate ${name} prop found. You are most likely using the deprecated ${pluginName} Babel plugin. Both __source and __self are automatically set when using the automatic runtime. Please remove transform-react-jsx-source and transform-react-jsx-self from your Babel config.`,
    );
  }
}
