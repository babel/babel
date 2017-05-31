export default function () {
  return {
    manipulateOptions(opts, parserOpts) {
      if (parserOpts.plugins.indexOf("flow") === -1) {
        parserOpts.plugins.push("flow");
      }
    }
  };
}
