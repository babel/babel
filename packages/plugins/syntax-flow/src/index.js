export default function () {
  return {
    manipulateOptions(opts, parserOpts) {
      var jsx = parserOpts.plugins.jsx;
      delete parserOpts.plugins.jsx;

      parserOpts.plugins.flow = true;
      if (jsx) parserOpts.plugins.jsx = true;
    }
  };
}
