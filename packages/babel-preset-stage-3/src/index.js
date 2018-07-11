export default function() {
  throw new Error(`
As of v7.0.0-beta.52, we've decided to remove
the official Babel Stage presets. You can find more information
at issue #7770: https://github.com/babel/babel/issues/7770, but
the TL;DR is that it's causing more harm than convenience in that
the preset is always out of date, each change is usually going to
require a major version bump and thus people will be behind,
and it encouraged too many people to opt-in to too many proposals
that they didn't intend to. This is intended to be the last publish
of "@babel/preset-stage-3"

If you want the same configuration as before:

{
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings"
  ]
}

We recommend that make your own presets to use across projects for
reusability. This can be as simple as exporting a function that returns your config/array of plugins.

module.exports = function() {
  return {
    plugins: [
      // ...
    ]
  };
};
`);
}
