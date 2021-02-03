import { OptionValidator } from "@babel/helper-validator-option";
const v = new OptionValidator("@babel/preset-flow");

export default function normalizeOptions(options = {}) {
  let { all, allowDeclareFields } = options;

  if (process.env.BABEL_8_BREAKING) {
    const TopLevelOptions = {
      all: "all",
      allowDeclareFields: "allowDeclareFields",
    };
    v.validateTopLevelOptions(options, TopLevelOptions);
    all = v.validateBooleanOption(TopLevelOptions.all, options.all);
    allowDeclareFields = v.validateBooleanOption(
      TopLevelOptions.allowDeclareFields,
      options.allowDeclareFields,
    );
  }

  return {
    all,
    allowDeclareFields,
  };
}
