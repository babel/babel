import * as prettier from "prettier";

export default async function formatCode(code, filename) {
  const prettierConfig = await prettier.resolveConfig(filename);
  prettierConfig.filepath = filename;
  prettierConfig.parser = filename.endsWith(".ts") ? "babel-ts" : "babel";

  return prettier.format(code, prettierConfig);
}
