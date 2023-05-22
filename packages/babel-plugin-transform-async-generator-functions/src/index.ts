import { declare } from "@babel/helper-plugin-utils";
import remapAsyncToGenerator from "@babel/helper-remap-async-to-generator";
import syntaxAsyncGenerators from "@babel/plugin-syntax-async-generators";
import type { NodePath, Visitor } from "@babel/traverse";
import { traverse, types as t, type PluginPass } from "@babel/core";
import rewriteForAwait from "./for-await";
import environmentVisitor from "@babel/helper-environment-visitor";

export default declare(api => {
  api.assertVersion(7);

  const yieldStarVisitor = traverse.visitors.merge<PluginPass>([
    {
      ArrowFunctionExpression(path) {
        path.skip();
      },

      YieldExpression({ node }, state) {
        if (!node.delegate) return;
        const asyncIter = t.callExpression(state.addHelper("asyncIterator"), [
          node.argument,
        ]);
        node.argument = t.callExpression(
          state.addHelper("asyncGeneratorDelegate"),
          process.env.BABEL_8_BREAKING
            ? [asyncIter]
            : [asyncIter, state.addHelper("awaitAsyncGenerator")],
        );
      },
    },
    environmentVisitor,
  ]);

  const forAwaitVisitor = traverse.visitors.merge<PluginPass>([
    {
      ArrowFunctionExpression(path) {
        path.skip();
      },

      ForOfStatement(path: NodePath<t.ForOfStatement>, { file }) {
        const { node } = path;
        if (!node.await) return;

        const build = rewriteForAwait(path, {
          getAsyncIterator: file.addHelper("asyncIterator"),
        });

        const { declar, loop } = build;
        const block = loop.body as t.BlockStatement;

        // ensure that it's a block so we can take all its statements
        path.ensureBlock();

        // add the value declaration to the new loop body
        if (declar) {
          block.body.push(declar);
          if (path.node.body.body.length) {
            block.body.push(t.blockStatement(path.node.body.body));
          }
        } else {
          block.body.push(...path.node.body.body);
        }

        t.inherits(loop, node);
        t.inherits(loop.body, node.body);

        const p = build.replaceParent ? path.parentPath : path;
        p.replaceWithMultiple(build.node);

        // TODO: Avoid crawl
        p.scope.parent.crawl();
      },
    },
    environmentVisitor,
  ]);

  const visitor: Visitor<PluginPass> = {
    Function(path, state) {
      if (!path.node.async) return;

      path.traverse(forAwaitVisitor, state);

      if (!path.node.generator) return;

      path.traverse(yieldStarVisitor, state);

      // We don't need to pass the noNewArrows assumption, since
      // async generators are never arrow functions.
      remapAsyncToGenerator(path, {
        wrapAsync: state.addHelper("wrapAsyncGenerator"),
        wrapAwait: state.addHelper("awaitAsyncGenerator"),
      });
    },
  };

  return {
    name: "transform-async-generator-functions",
    inherits: syntaxAsyncGenerators.default,

    visitor: {
      Program(path, state) {
        // We need to traverse the ast here (instead of just vising Function
        // in the top level visitor) because for-await needs to run before the
        // async-to-generator plugin. This is because for-await is transpiled
        // using "await" expressions, which are then converted to "yield".
        //
        // This is bad for performance, but plugin ordering will allow as to
        // directly visit Function in the top level visitor.
        path.traverse(visitor, state);
      },
    },
  };
});
