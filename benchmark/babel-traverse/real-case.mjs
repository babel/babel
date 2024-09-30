import {
  loadFixtures,
  addBenchCase,
  baselineParser,
  baselineTraverse,
  currentTraverse,
  generateCaseName,
} from "../util.mjs";

const fixtures = loadFixtures();

fixtures.forEach(({ name, content }) => {
  if (name.includes("ts-checker.ts")) return;

  const ast = baselineParser.parse(content, {
    sourceType: "module",
    plugins: name.endsWith(".ts") ? ["typescript"] : [],
  });

  addBenchCase(
    `${generateCaseName(import.meta.url)} ${name}`,
    baselineTraverse.default,
    currentTraverse,
    [ast]
  );
});
