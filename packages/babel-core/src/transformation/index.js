/* @flow */

import Pipeline from "./pipeline";

let pipeline = new Pipeline;
let transform = pipeline.transform.bind(pipeline);
transform.fromAst = pipeline.transformFromAst.bind(pipeline);
transform.lint = pipeline.lint.bind(pipeline);
transform.pipeline = pipeline;
export default transform;
