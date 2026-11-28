import { setFlagsFromString } from "node:v8";
import Buffer from "../lib/buffer.js";

// V8 intrinsics, or null when this V8 lacks %StringIsFlat (Node.js < 24).
let natives = null;
try {
  setFlagsFromString("--allow-natives-syntax");
  natives = new Function(`
    const isFlat = s => %StringIsFlat(s);
    const prepare = f => %PrepareFunctionForOptimization(f);
    const optimizeOnNextCall = f => %OptimizeFunctionOnNextCall(f);
    // Compile them now: lazy compilation after the flag is reset would throw.
    const f = () => {};
    isFlat(""), prepare(f), optimizeOnNextCall(f);
    return { isFlat, prepare, optimizeOnNextCall };
  `)();
} catch {
  // %StringIsFlat is not available.
} finally {
  // Do not allow natives syntax in code parsed by later test files.
  setFlagsFromString("--no-allow-natives-syntax");
}

(natives ? describe : describe.skip)("Buffer chunk flattening", () => {
  // Creates a buffer that records, for every chunk moved to `_buf`, whether
  // the chunk was flat at that point.
  function createBuffer(flatness) {
    const buf = new Buffer(null, " ");
    let value = buf._buf;
    Object.defineProperty(buf, "_buf", {
      get: () => value,
      set(v) {
        flatness.push(natives.isFlat(this._str));
        value = v;
      },
    });
    return buf;
  }

  function fill(buf) {
    for (let i = 0; i < 200_000; i++) {
      buf._append("ab" + (i % 10), false, true);
    }
  }

  it("flattens each chunk", () => {
    const flatness = [];
    fill(createBuffer(flatness));
    expect(flatness.length).toBeGreaterThan(1);
    expect(flatness.every(Boolean)).toBe(true);
  });

  it("flattens each chunk when inlined into optimized code", () => {
    // When TurboFan inlines `_append` into a hot caller, an operation whose
    // result is unused, such as `str.includes("\0")`, can be eliminated as
    // dead code.
    natives.prepare(fill);
    fill(createBuffer([]));
    fill(createBuffer([]));
    natives.optimizeOnNextCall(fill);

    const flatness = [];
    fill(createBuffer(flatness));
    expect(flatness.length).toBeGreaterThan(1);
    expect(flatness.every(Boolean)).toBe(true);
  });
});
