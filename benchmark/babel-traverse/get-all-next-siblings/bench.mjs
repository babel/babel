import {
  Benchmark,
  baselineParser,
  baselineTraverse,
  currentTraverse,
} from "../../util.mjs";

function createInput(length, traverseImpl) {
  const ast = baselineParser.parse(
    Array(length)
      .fill(0)
      .map((_, i) => `${i};`)
      .join("\n")
  );
  let programPath;
  traverseImpl(ast, {
    Program(path) {
      programPath = path;
      path.stop();
    },
  });
  const body = programPath.get("body");
  return {
    0: body[0],
    50: body[Math.floor(length / 2)],
    75: body[Math.floor((length * 3) / 4)],
    100: body[length - 1],
  };
}

function benchCases(name, implementation) {
  for (const length of [256, 512, 1024, 2048]) {
    const inputs = createInput(length, implementation);
    const benchmark = new Benchmark();
    for (const [index, input] of Object.entries(inputs)) {
      benchmark.add(
        `${name} getAllNextSiblings from the ${index}% percentile within ${length} statements`,
        () => {
          input.getAllNextSiblings();
        }
      );
    }
    benchmark.run();
  }
}

benchCases("baseline", baselineTraverse.default.default);
benchCases("current", currentTraverse.default);
