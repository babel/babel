import { Benchmark, baselineTypes, currentTypes } from "../../util.mjs";

const bench = new Benchmark();

function benchCases(implementations) {
  for (const version in implementations) {
    const t = implementations[version];
    const func = t.stringLiteral;
    const func2 = t.memberExpression;
    const func3 = t.assignmentExpression;
    const func4 = t.binaryExpression;

    const id = t.identifier("id");
    const id2 = t.identifier("id2");
    bench.add(`${version} builder`, () => {
      func("bar");
      func2(id, id2, /*computed?*/ false /*, optional? missing*/);
      func3("=", id, id2);
      func4("+", id, id2);
    });
  }
}

benchCases({ baselineTypes, currentTypes });

bench.run();
