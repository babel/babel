import Pipeline from "./pipeline";

var pipeline = new Pipeline;
var transform = pipeline.transform.bind(pipeline);
transform.fromAst = pipeline.transformFromAst.bind(pipeline);
transform.lint = pipeline.lint.bind(pipeline);
transform.pipeline = pipeline;
export default transform;
