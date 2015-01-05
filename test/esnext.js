if (!process.env.ALL_6TO5_TESTS) return;

require("./_transformation-helper")({
  name: "esnext"
});
