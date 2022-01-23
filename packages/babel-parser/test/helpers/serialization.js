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
export const deserialize = (filename, string) =>
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
  );
