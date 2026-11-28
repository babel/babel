import runRoundtripTests from "./helpers/roundtrip.js";

describe("minified roundtrip", () => {
  runRoundtripTests({ minified: true });
});
