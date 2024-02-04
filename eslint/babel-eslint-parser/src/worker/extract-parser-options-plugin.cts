export = function extractParserOptionsPlugin() {
  return {
    parserOverride(code: string, opts: any) {
      return opts;
    },
  };
};
