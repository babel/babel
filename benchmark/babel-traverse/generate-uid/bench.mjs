// Run with Node.js >= 26:
//   node --experimental-bench --no-warnings --bench bench.mjs
// For an A/B comparison, run each benchmark in its own process with
// --bench-name-pattern (e.g. "^generateUid 1000 current$").
import { bench, suite } from "node:bench";
import baseline from "@babel-baseline/traverse";
import current from "@babel/traverse";
import * as baselineParser from "@babel-baseline/parser";
import * as currentParser from "@babel/parser";

const implementations = {
  baseline: { traverse: baseline.default, parser: baselineParser },
  current: { traverse: current, parser: currentParser },
};

// The uids are generated in the innermost of a few nested functions, as the
// non-cached checks of `generateUid` walk the scope chain.
const input = "function a(){function b(){function c(){function d(){}}}}";

function createScope({ traverse, parser }) {
  let scope;
  traverse(parser.parse(input), {
    FunctionDeclaration(path) {
      if (path.node.id.name === "d") {
        scope = path.get("body").scope;
        path.stop();
      }
    },
  });
  return scope;
}

const cases = {
  generateUid: (scope, count) => {
    for (let i = 0; i < count; i++) scope.generateUid("ref");
  },
  generateDeclaredUidIdentifier: (scope, count) => {
    for (let i = 0; i < count; i++) scope.generateDeclaredUidIdentifier("ref");
  },
};

for (const [name, run] of Object.entries(cases)) {
  for (const count of [100, 1000]) {
    suite(`${name} ${count}`, () => {
      for (const [implementation, impl] of Object.entries(implementations)) {
        bench(implementation, t => {
          // Every sample needs a fresh program, as the generated uids are
          // never released.
          const scope = createScope(impl);
          t.start();
          run(scope, count);
          t.end(count);
        });
      }
    });
  }
}
