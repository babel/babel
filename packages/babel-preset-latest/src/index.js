import { buildPreset } from "babel-preset-es2015";
import * as presetES2016 from "babel-preset-es2016";
import * as presetES2017 from "babel-preset-es2017";

export default function (context, opts = {}) {
  return {
    presets: [
      opts.es2015 !== false && [buildPreset, opts.es2015],
      opts.es2016 !== false && presetES2016,
      opts.es2017 !== false && presetES2017
    ].filter(Boolean)
  };
}
