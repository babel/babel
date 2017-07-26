"use strict";

let envOpts = {
  loose: true
};

module.exports = {
  comments: false,
  plugins: [
    // temp until next release
    function() {
      return {
        visitor: {
          "Function": function(path) {
            const node = path.node;
            for (let i = 0; i < node.params.length; i++) {
              const param = node.params[i];
              if (param.type === "AssignmentPattern") {
                param.left.optional = false;
              }
            }
          }
        }
      };
    }
  ],
  presets: [
    ["env", envOpts],
    "stage-0",
    "flow"
  ],
  env: {
    cov: {
      auxiliaryCommentBefore: "istanbul ignore next",
      plugins: ["istanbul"]
    }
  }
};

if (process.env.BABEL_ENV === "development") {
  envOpts.targets = {
    node: "current"
  };
  envOpts.debug = true;
}
