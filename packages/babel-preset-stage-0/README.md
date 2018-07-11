# @babel/preset-stage-0

> As of v7.0.0-beta.52, we've decided to remove
the official Babel Stage presets. You can find more information
at issue [#7770](https://github.com/babel/babel/issues/7770), but
the TL;DR is that it's causing more harm than convenience in that
the preset is always out of date, each change is usually going to
require a major version bump and thus people will be behind,
and it encouraged too many people to opt-in to too many proposals
that they didn't intend to.

---

If you want the same configuration as before, you can use this configuration, although keep in mind that Stage 0 contains Stage 1 which is also deprecated.

```json
{
  "presets": [
    [
      "@babel/preset-stage-1", { 
        "loose": false,
        "useBuiltIns": false,
        "decoratorsLegacy": true,
        "pipelineProposal": "minimal"
      }
    ]
  ],
  "plugins": ["@babel/plugin-proposal-function-bind"]
}
```

And without reference to any Stage preset:

```json
{
  "plugins": [
    // Stage 0
    "@babel/plugin-proposal-function-bind",

    // Stage 1
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-logical-assignment-operators",
    ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
    ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
    ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
    "@babel/plugin-proposal-do-expressions",

    // Stage 2
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings"
  ]
}
```

This will be the last publish of "@babel/preset-stage-0", and it won't be
in the final release.
If it's a hassle to maintain, you can certainly make your own preset to use
across projects, or there might be one in the community to use.