export default {
  plugins: [
    "transform-dynamic-import",
    [
      "transform-modules-amd",
      { importInterop: source => (source === "a" ? "none" : "babel") },
    ],
  ],
};
