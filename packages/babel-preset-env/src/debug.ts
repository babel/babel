import { getInclusionReasons } from "@babel/helper-compilation-targets";

import type { Targets } from "@babel/helper-compilation-targets";

// Outputs a message that shows which target(s) caused an item to be included:
// transform-foo { "edge":"13", "firefox":"49", "ie":"10" }
export const logPlugin = (
  item: string,
  targetVersions: Targets,
  list: { [key: string]: Targets },
) => {
  const filteredList = getInclusionReasons(item, targetVersions, list);

  const support = list[item];

  if (!support) {
    console.log(`  ${item}`);
    return;
  }

  let formattedTargets = `{`;
  let first = true;
  for (const target of Object.keys(filteredList)) {
    if (!first) formattedTargets += `,`;
    first = false;
    formattedTargets += ` ${target}`;
    if (support[target]) formattedTargets += ` < ${support[target]}`;
  }
  formattedTargets += ` }`;

  console.log(`  ${item} ${formattedTargets}`);
};
