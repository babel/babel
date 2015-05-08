import Pipeline from "./transformer-pipeline";

var pipeline = new Pipeline;

//

import transformers from "./transformers";

for (var key in transformers) {
  var transformer = transformers[key];
  var metadata = transformer.metadata = transformer.metadata || {};
  metadata.group = metadata.group || "builtin-basic";
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
pipeline.addFilter(filters.internal);
pipeline.addFilter(filters.blacklist);
pipeline.addFilter(filters.whitelist);
pipeline.addFilter(filters.stage);
pipeline.addFilter(filters.optional);

//

var transform = pipeline.transform.bind(pipeline);
transform.fromAst = pipeline.transformFromAst.bind(pipeline);
transform.pipeline = pipeline;
export default transform;
