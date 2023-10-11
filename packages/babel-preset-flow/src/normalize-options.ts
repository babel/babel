import { OptionValidator } from "@babel/helper-validator-option";
const v = new OptionValidator("@babel/preset-flow");

export default function normalizeOptions(options: any = {}) {
  let { all, ignoreExtensions } = options;
  const { allowDeclareFields } = options;

  if (process.env.BABEL_8_BREAKING) {
    v.invariant(
      !("allowDeclareFields" in options),
      `Since Babel 8, \`declare property: A\` is always supported, and the "allowDeclareFields" option is no longer available. Please remove it from your config.`,
    );
    const TopLevelOptions = {
      all: "all",
      ignoreExtensions: "ignoreExtensions",
    };
    v.validateTopLevelOptions(options, TopLevelOptions);
    all = v.validateBooleanOption(TopLevelOptions.all, all);
    ignoreExtensions = v.validateBooleanOption(
      TopLevelOptions.ignoreExtensions,
      ignoreExtensions,
    );
    return { all, ignoreExtensions };
  } else {
    return {
      all,
      allowDeclareFields,
      ignoreExtensions,
    };
  }
}
