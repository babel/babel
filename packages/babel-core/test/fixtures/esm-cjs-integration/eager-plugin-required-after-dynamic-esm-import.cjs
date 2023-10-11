import("../../../lib/index.js")
  .then(babel =>
    babel.transformAsync("REPLACE_ME;", {
      configFile: false,
      plugins: [require("./plugins/eager.cjs")],
    }),
  )
  .then(out => console.log(out.code), console.error);
