import runRoundtripTests from "./helpers/roundtrip.js";

describe("concise roundtrip", () => {
  runRoundtripTests({ concise: true });
});
