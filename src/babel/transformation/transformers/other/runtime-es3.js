import core from "core-js/client/library";
import buildRuntimeTransformer from "../../helpers/build-runtime-transformer";

buildRuntimeTransformer(exports, core, "es3");
