export default function () {
  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.features["es7.trailingFunctionCommas"] = true;
    }
  };
}
