import template from "babel-template";
import explodeClass from "babel-helper-explode-class";

const buildClassDecorator = template(`
  CLASS_REF = DECORATOR(CLASS_REF) || CLASS_REF;
`);

export default function ({ types: t }) {
  function cleanDecorators(decorators) {
    return decorators.reverse().map((dec) => dec.expression);
  }

  function transformClass(path, ref, state) {
    const nodes = [];

    state;

    let classDecorators = path.node.decorators;
    if (classDecorators) {
      path.node.decorators = null;
      classDecorators = cleanDecorators(classDecorators);

      for (const decorator of classDecorators) {
        nodes.push(buildClassDecorator({
          CLASS_REF: ref,
          DECORATOR: decorator
        }));
      }
    }

    const map = Object.create(null);

    for (const method of path.get("body.body")) {
      const decorators = method.node.decorators;
      if (!decorators) continue;

      const alias = t.toKeyAlias(method.node);
      map[alias] = map[alias] || [];
      map[alias].push(method.node);

      method.remove();
    }

    for (const alias in map) {
      const items = map[alias];

      items;
    }

    return nodes;
  }

  function nodeHasDecorators(node) {
    return node.decorators && node.decorators.length > 0;
  }

  function hasDecorators(path) {
    if (path.isClass()) {
      if (nodeHasDecorators(path.node)) return true;

      for (const method of (path.node.body.body: Array<Object>)) {
        if (nodeHasDecorators(method)) {
          return true;
        }
      }
    } else if (path.isObjectExpression()) {
      for (const prop of (path.node.properties: Array<Object>)) {
        if (nodeHasDecorators(prop)) {
          return true;
        }
      }
    }

    return false;
  }

  function doError(path) {
    throw path.buildCodeFrameError(
`Decorators are not officially supported yet in 6.x pending a proposal update.
However, if you need to use them you can install the legacy decorators transform with:

npm install babel-plugin-transform-decorators-legacy --save-dev

and add the following line to your .babelrc file:

{
  "plugins": ["transform-decorators-legacy"]
}

The repo url is: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy.
    `);
  }

  return {
    inherits: require("babel-plugin-syntax-decorators"),

    visitor: {
      ClassExpression(path) {
        if (!hasDecorators(path)) return;
        doError(path);

        explodeClass(path);

        const ref = path.scope.generateDeclaredUidIdentifier("ref");
        let nodes = [];

        nodes.push(t.assignmentExpression("=", ref, path.node));

        nodes = nodes.concat(transformClass(path, ref, this));

        nodes.push(ref);

        path.replaceWith(t.sequenceExpression(nodes));
      },

      ClassDeclaration(path) {
        if (!hasDecorators(path)) return;
        doError(path);
        explodeClass(path);

        const ref = path.node.id;
        let nodes = [];

        nodes = nodes.concat(transformClass(path, ref, this).map((expr) => t.expressionStatement(expr)));
        nodes.push(t.expressionStatement(ref));

        path.insertAfter(nodes);
      },

      ObjectExpression(path) {
        if (!hasDecorators(path)) return;
        doError(path);
      }
    }
  };
}
