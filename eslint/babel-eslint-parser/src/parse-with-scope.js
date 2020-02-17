import visitorKeys from "./visitor-keys";
import analyzeScope from "./analyze-scope";
import parse from "./parse";

export default function parseWithScope(code, options) {
  const ast = parse(code, options);
  const scopeManager = analyzeScope(ast, options);

  return { ast, scopeManager, visitorKeys };
}
