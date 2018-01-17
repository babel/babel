export function declare(builder) {
  return (api, options, dirname) => {
    if (!api.assertVersion) {
      // Inject a custom version of 'assertVersion' for Babel 6 and early
      // versions of Babel 7's beta that didn't have it.
      api = Object.assign({}, api, {
        assertVersion(range) {
          throwVersionError(range, api.version);
        },
      });
    }

    return builder(api, options || {}, dirname);
  };
}

function throwVersionError(range, version) {
  if (typeof range === "number") {
    if (!Number.isInteger(range)) {
      throw new Error("Expected string or integer value.");
    }
    range = `^${range}.0.0-0`;
  }
  if (typeof range !== "string") {
    throw new Error("Expected string or integer value.");
  }

  const limit = Error.stackTraceLimit;

  if (typeof limit === "number" && limit < 25) {
    // Bump up the limit if needed so that users are more likely
    // to be able to see what is calling Babel.
    Error.stackTraceLimit = 25;
  }

  let err;
  if (version.slice(0, 2) === "7.") {
    err = new Error(
      `Requires Babel "^7.0.0-beta.41", but was loaded with "${version}". ` +
        `You'll need to update your @babel/core version.`,
    );
  } else {
    err = new Error(
      `Requires Babel "${range}", but was loaded with "${version}". ` +
        `If you are sure you have a compatible version of @babel/core, ` +
        `it is likely that something in your build process is loading the ` +
        `wrong version. Inspect the stack trace of this error to look for ` +
        `the first entry that doesn't mention "@babel/core" or "babel-core" ` +
        `to see what is calling Babel.`,
    );
  }

  if (typeof limit === "number") {
    Error.stackTraceLimit = limit;
  }

  throw Object.assign(
    err,
    ({
      code: "BABEL_VERSION_UNSUPPORTED",
      version,
      range,
    }: any),
  );
}
