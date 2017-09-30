"use strict";

let envOpts = {
  loose: true
};

module.exports = {
  comments: false,
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
