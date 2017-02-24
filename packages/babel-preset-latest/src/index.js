import presetES2015 from "babel-preset-es2015";
import presetES2016 from "babel-preset-es2016";
import presetES2017 from "babel-preset-es2017";

// Rather than exporting a default object to represent the preset, we can
// also export a default function instead, as this preset demonstrates.
// This allows one to further configure a preset by way of specific options.
export default function (context, opts = {}) {
  return {
    presets: [
      opts.es2015 !== false && [presetES2015.buildPreset, opts.es2015],
      opts.es2016 !== false && presetES2016,
      opts.es2017 !== false && presetES2017
    ].filter(Boolean) // filter out falsy values
  };
}
