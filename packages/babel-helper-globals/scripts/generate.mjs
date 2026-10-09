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
    Object.keys(globalsData).filter(v => filterCondition.test(v))
  );
}
