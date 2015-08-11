import Pipeline from "./pipeline";

/**
 * [Please add a description.]
 */

var pipeline = new Pipeline;

/**
 * [Please add a description.]
 */

import transformers from "./transformers";

for (var key in transformers) {
  var transformer = transformers[key];

  if (typeof transformer === "object") {
    var metadata = transformer.metadata = transformer.metadata || {};
    metadata.group = metadata.group || "builtin-basic";
  }
}

pipeline.addTransformers(transformers);

/**
 * [Please add a description.]
 */

import deprecated from "./transformers/deprecated";
pipeline.addDeprecated(deprecated);

/**
 * [Please add a description.]
 */

import aliases from "./transformers/aliases";
pipeline.addAliases(aliases);

/**
 * [Please add a description.]
 */

import * as filters from "./transformers/filters";
pipeline.addFilter(filters.internal);
pipeline.addFilter(filters.blacklist);
pipeline.addFilter(filters.whitelist);
pipeline.addFilter(filters.stage);
pipeline.addFilter(filters.optional);

/**
 * [Please add a description.]
 */

var transform = pipeline.transform.bind(pipeline);
transform.fromAst = pipeline.transformFromAst.bind(pipeline);
transform.pipeline = pipeline;
export default transform;
