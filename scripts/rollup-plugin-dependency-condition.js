import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default function () {
  return {
    name: "dependency-condition",
    resolveId(specifier, referrer) {
      const re = /^(.*?-BABEL_8_BREAKING)-(?:true|false)$/;
      const match = specifier.match(re);
      if (!match) return null;
      return require.resolve(`${match[1]}-${!!process.env.BABEL_8_BREAKING}`, {
        paths: [referrer],
      });
    },
  };
}
