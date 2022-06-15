import { default as shell } from "shelljs";

console.log("Cloning LICENSE to babel packages");

shell.ls("-d", "./packages/*/").forEach(dir => {
  if (
    !dir.match(
      /.*packages\/(babel-parser|babel-plugin-transform-object-assign)\/?$/
    )
  ) {
    shell.cp("LICENSE", dir);
  }
});

shell.ls("-d", "./eslint/*/").forEach(dir => {
  if (!dir.match(/.*eslint\/(babel-eslint-plugin)\/?$/)) {
    shell.cp("LICENSE", dir);
  }
});
