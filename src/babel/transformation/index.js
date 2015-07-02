import Pipeline from "./pipeline";

var pipeline = new Pipeline;

//

import transformers from "./transformers";

for (var key in transformers) {
  var transformer = transformers[key];

  if (typeof transformer === "object") {
    var metadata = transformer.metadata = transformer.metadata || {};
    metadata.group = metadata.group || "builtin-basic";
  }
}

pipeline.addTransformers(transformers);

//

import deprecated from "./transformers/deprecated";
pipeline.addDeprecated(deprecated);

//

import aliases from "./transformers/aliases";
pipeline.addAliases(aliases);

//

import * as filters from "./transformers/filters";
pipeline.addFilter(filters.internal, filters.blacklist, filters.whitelist, filters.stage, filters.optional);

//

var transform = pipeline.transform.bind(pipeline);
transform.fromAst = pipeline.transformFromAst.bind(pipeline);
transform.pipeline = pipeline;
export default transform;
