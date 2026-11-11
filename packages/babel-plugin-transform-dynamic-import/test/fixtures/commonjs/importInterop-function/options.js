export default {
  plugins: [
    "transform-dynamic-import",
    [
      "transform-modules-commonjs",
      { importInterop: source => (source === "a" ? "none" : "babel") },
    ],
  ],
};
