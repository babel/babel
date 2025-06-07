import { declare } from "@babel/helper-plugin-utils";
import remapAsyncToGenerator from "@babel/helper-remap-async-to-generator";
import type { NodePath, PluginPass } from "@babel/core";
import { types as t } from "@babel/core";
import { visitors } from "@babel/traverse";
import rewriteForAwait from "./for-await.ts";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  const yieldStarVisitor = visitors.environmentVisitor<PluginPass>({
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
  });

  const forAwaitVisitor = visitors.environmentVisitor<PluginPass>({
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
  });

  return {
    name: "transform-async-generator-functions",

    manipulateOptions: process.env.BABEL_8_BREAKING
      ? undefined
      : (_, parser) => parser.plugins.push("asyncGenerators"),

    visitor: {
      Function(path, state) {
        if (path.node.async && path.node.generator) {
          path.traverse(yieldStarVisitor, state);

          path.setData(
            "@babel/plugin-transform-async-generator-functions/async_generator_function",
            true,
          );

          // We don't need to pass the noNewArrows assumption, since
          // async generators are never arrow functions.
          remapAsyncToGenerator(path, {
            wrapAsync: state.addHelper("wrapAsyncGenerator"),
            wrapAwait: state.addHelper("awaitAsyncGenerator"),
          });
        }
      },
      Program(path, state) {
        if (path.node.extra?.forAwait === false) {
          return;
        }

        // We need to traverse the ast here (instead of just vising Function
        // in the top level visitor) because for-await needs to run before the
        // async-to-generator plugin. This is because for-await is transpiled
        // using "await" expressions, which are then converted to "yield".
        //
        // This is bad for performance, but plugin ordering will allow as to
        // directly visit Function in the top level visitor.
        path.traverse(
          {
            Function(path, state) {
              if (!path.node.async) return;

              path.traverse(forAwaitVisitor, state);
            },
          },
          state,
        );
      },
    },
  };
});
