const NAME = "ReplaceFilenameRegexpWebpackPlugin";

exports[NAME] = class {
  constructor(re, replacement, source = "relative", target = "resolve") {
    this.re = re;
    this.replacement = replacement;
    this.source = source;
    this.target = target;
  }

  apply(resolver) {
    const target = resolver.ensureHook(this.target);
    resolver
      .getHook(this.source)
      .tapAsync(NAME, (request, resolveContext, callback) => {
        const innerRequest = request.request || request.path;
        if (!innerRequest) return callback();

        if (!this.re.test(innerRequest)) return callback();

        const newRequestStr = innerRequest.replace(this.re, this.replacement);

        const obj = Object.assign({}, request, {
          request: newRequestStr,
        });
        return resolver.doResolve(
          target,
          obj,
          `regex replacement: '${innerRequest}' -> ${newRequestStr}`,
          resolveContext,
          (err, result) => {
            if (err) return callback(err);

            // Don't allow other aliasing or raw request
            if (result === undefined) return callback(null, null);
            callback(null, result);
          }
        );
      });
  }
};
