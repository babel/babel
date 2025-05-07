import * as prettier from "prettier";

export default async function formatCode(code, filename) {
  const prettierConfig = await prettier.resolveConfig(filename);
  prettierConfig.filepath = filename;
  // let prettier automatically determine the parser for non-ts files
  prettierConfig.parser = filename.endsWith(".ts") ? "babel-ts" : undefined;

  return prettier.format(code, prettierConfig);
}
