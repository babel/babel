/* global VERSION */

import { registerPreset } from "babel-standalone";
import babelPresetEnv from "babel-preset-env";

registerPreset("env", babelPresetEnv);

export const version = VERSION;
