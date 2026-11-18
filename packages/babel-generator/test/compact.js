import runRoundtripTests from "./helpers/roundtrip.js";

describe("compact roundtrip", () => {
  runRoundtripTests({ compact: true });
});
