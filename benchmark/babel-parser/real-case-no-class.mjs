import { loadFixtures, addBenchCase, generateCaseName } from "../util.mjs";
import * as currentParser from "../../codemods/babel-plugin-optimization-class-to-function/test/fixtures/parser/real-world/output.mjs";
import * as baselineParser from "../../codemods/babel-plugin-optimization-class-to-function/test/fixtures/parser/real-world/input.mjs";

const fixtures = loadFixtures();

fixtures.forEach(({ name, content }) => {
  if (name !== "jquery-3.6.js" && name !== "babel-parser-express.ts") return;
  addBenchCase(
    `${generateCaseName(import.meta.url)} ${name}`,
    baselineParser.parse,
    currentParser.parse,
    [
      content,
      {
        sourceType: "module",
        plugins: name.endsWith(".ts") ? ["typescript"] : [],
      },
    ]
  );
});
