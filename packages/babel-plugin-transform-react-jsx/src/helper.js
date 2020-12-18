import * as t from "@babel/types";
import annotateAsPure from "@babel/helper-annotate-as-pure";

export function helper(options) {
  const {
    development,

    RUNTIME_DEFAULT,

    filter,
    useSpread,
    useBuiltIns,

    post,
  } = options;

  return {
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

    let tagName;
    if (t.isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (t.isLiteral(tagExpr)) {
      tagName = tagExpr.value;
    }

    const args = [getTag(tagName, tagExpr)];

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

    if (!development) {
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

    const state = { pure: false };
    post(state, file);

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

    const tagName = null;
    const tagExpr = file.get("@babel/plugin-react-jsx/jsxFragIdentifier")();

    const args = [getTag(tagName, tagExpr)];

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

    if (development) {
      args.push(
        path.scope.buildUndefinedNode(),
        t.booleanLiteral(path.node.children.length > 1),
      );
    }

    const state = { pure: false };
    if (post) {
      post(state, file);
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
    if (filter && !filter(path.node, file)) {
      return;
    }

    const openingPath = path.get("openingElement");
    openingPath.parent.children = t.react.buildChildren(openingPath.parent);

    const tagName = null;
    const tagExpr = file.get("@babel/plugin-react-jsx/jsxFragIdentifier")();

    const state = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args,
      pure: false,
    };

    const args = [getTag(tagName, tagExpr)];

    // no attributes are allowed with <> syntax
    args.push(t.nullLiteral(), ...path.node.children);

    if (post) {
      post(state, file);
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

    let tagName;
    if (t.isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (t.isLiteral(tagExpr)) {
      tagName = tagExpr.value;
    }

    const args = [getTag(tagName, tagExpr)];

    const attribs = buildCreateElementOpeningElementAttributes(
      file,
      path,
      openingPath.node.attributes,
    );

    args.push(attribs, ...path.node.children);

    const state = { pure: false };
    if (post) {
      post(state, file);
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

function getTag(tagName, tagExpr) {
  if (t.react.isCompatTag(tagName)) {
    return t.stringLiteral(tagName);
  } else {
    return tagExpr;
  }
}
