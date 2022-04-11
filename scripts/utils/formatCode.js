import prettier from "prettier";

export default function formatCode(code, filename) {
  const prettierConfig = prettier.resolveConfig.sync(filename);
  prettierConfig.filepath = filename;
  prettierConfig.parser = filename.endsWith(".ts") ? "babel-ts" : "babel";

  return prettier.format(code, prettierConfig);
}
