const { parse: JSONParse } = JSON;

// We give JSON files that needed our special serialization the extension
// ".serialized.json" instead of just ".json" so that we can only use our
// deserialization function in those cases (which is slower), and in all
// other instances just rely on normal JSON.parse with no deserialization
// function.
const isSerialized = filename => /\.serialized\.json$/.test(filename);

// We've only serialized one BigInt in the entire test suite:
//
// packages/babel-parser/test/fixtures/estree/basic/bigint/output.serialized.json
//
// This is because only estree actually includes the BigInt value in the Literal
// node. If the JS environemnt doesn't support bigint, then estree will just
// use null for the value. We also happen to just throw the AST information away
// with estree tests, so in the event that we're running on an older version of
// Node that doesn't support bigint, it is safe to deserialize to null.
const toBigInt = global.BigInt || (() => null);

const SerializationKey = "$$ babel internal serialized type";

/* eslint-disable no-confusing-arrow */
export const deserialize = (filename, options, string) =>
  withErrors(
    options.throws,
    !!string &&
      JSONParse(
        string,
        isSerialized(filename) &&
          ((key, value) =>
            key !== "value" ||
            !value ||
            typeof value !== "object" ||
            !value[SerializationKey]
              ? value
              : value[SerializationKey] === "RegExp"
              ? new RegExp(value.source, value.flags)
              : toBigInt(value.value)),
      ),
  );

// For now we assemble this structure here, but in the future we should just
// store the entire thing into output.json, instead of thrown errors in
// options.json. If we end up going with
// https://github.com/babel/babel/issues/14175, then as a side-effect we'll
// actually get this behavior for free, since everything will always just be
// store in the errors array.
function withErrors(throws, ast) {
  const threw = !!throws && toError(throws);
  const errors = !!ast && !!ast.errors && ast.errors.map(toError);

  return { threw, ast: errors ? { ...ast, errors } : ast };
}

// This is more complicated than it needs to be because for unfortunately thrown
// errors and recovered errors are serialized slightly differently. Thrown
// errors are serialized *without* their corresponding class name (the result of
// calling .toString() on the error), while errors in the errors array of the
// AST are serialized *with* the class name (the result of just storing the
// contents of the message). As such, the type information is lost for thrown
// errors, but it just happens to be that they're all SyntaxErrors.
//
// Because of this, we have to account for both cases here, so if the name is
// present, we use it, otherwise, we just assume it's a SyntaxError. In the
// future, we should serialize the errors into an object representation instead
// of just a string, which we can use to additionally store the location info so
// we can test that too.
const ErrorPrefixRegExp = /^[A-Za-z]*Error:\s/;
const toError = message =>
  /^Error/.test(message.replace(ErrorPrefixRegExp, ""))
    ? Error(message.replace(ErrorPrefixRegExp, ""))
    : SyntaxError(message.replace(ErrorPrefixRegExp, ""));
