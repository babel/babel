import core from "core-js/library";
import buildRuntimeTransformer from "../../helpers/build-runtime-transformer";

buildRuntimeTransformer(exports, core, "es5");
