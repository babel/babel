import rewritePattern from 'regexpu-core';
import * as regex from 'babel-helper-regex';

export default function() {
  return {
    'visitor': {
      RegExpLiteral(path, state) {
        const node = path.node;
        if (!regex.is(node, 'u')) {
          return;
        }
        const useUnicodeFlag = state.opts.useUnicodeFlag || false;
        node.pattern = rewritePattern(node.pattern, node.flags, {
          'unicodePropertyEscape': true,
          'useUnicodeFlag': useUnicodeFlag
        });
        if (!useUnicodeFlag) {
          regex.pullFlag(node, 'u');
        }
      }
    }
  };
}
