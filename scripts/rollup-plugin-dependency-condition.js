// @ts-check

/**
 * Rollup plugin to conditionally include/exclude dependencies based on the
 * BABEL_9_BREAKING flag.
 * @param {boolean} value - The flag to determine inclusion or exclusion.
 * @returns {import("rollup").Plugin} - The Rollup plugin.
 */
export default function (value) {
  const re = value
    ? /^(.*?-BABEL_9_BREAKING)-false$/
    : /^(.*?-BABEL_9_BREAKING)-true$/;
  return {
    name: "dependency-condition",
    resolveId(source, importer, options) {
      const match = source.match(re);
      if (!match) return null;
      return this.resolve(`${match[1]}-${value}`, importer, options);
    },
  };
}
