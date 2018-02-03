// @flow

import loadConfig, { InputOptions } from "./config";
import normalizeFile from "./transformation/normalize-file";
import normalizeOptions from "./transformation/normalize-opts";

type AstRoot = BabelNodeFile | BabelNodeProgram;

export default function parse(
  code: string,
  opts: InputOptions,
): AstRoot | null {
  const config = loadConfig(opts);

  if (config === null) {
    return null;
  }

  const file = normalizeFile(config.passes, normalizeOptions(config), code);

  return file.ast;
}
