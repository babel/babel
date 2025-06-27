import path from "node:path";
import globals from "globals";

export default function generate(filename) {
  const [category, letterCase] = path.basename(filename, ".json").split("-");
  return generateData(category, letterCase);
}

function generateData(category, letterCase) {
  const globalsData = globals[category];
  const filterCondition = letterCase === "upper" ? /^[A-Z]/ : /^[a-z]/;
  return JSON.stringify(
    // The "Iterator" global is not included because the Babel construct helper
    // packages/babel-helpers/src/helpers/construct.ts, emitted from the wrapNativeSuper helper,
    // will invoke it with `new Iterator()` when native Reflect.construct is not available.
    // However, the abstract class Iterator can not be invoked with new. Since the browser-upper.json
    // is only used for the superIsCallableConstructor assumption, we should prioritize the spec mode
    Object.keys(globalsData).filter(
      v => filterCondition.test(v) && v !== "Iterator"
    )
  );
}
