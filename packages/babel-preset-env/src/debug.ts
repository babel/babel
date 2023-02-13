import {
  getInclusionReasons,
  type Targets,
  type Target,
} from "@babel/helper-compilation-targets";
import compatData from "@babel/compat-data/plugins";

// Outputs a message that shows which target(s) caused an item to be included:
// transform-foo { "edge":"13", "firefox":"49", "ie":"10" }
export const logPlugin = (
  item: string,
  targetVersions: Targets,
  list: { [key: string]: Targets },
) => {
  const filteredList = getInclusionReasons(item, targetVersions, list);

  const support = list[item];

  // TODO(Babel 8): Remove this. It's needed to keep outputting proposal-
  // in the debug log.
  if (item.startsWith("transform-")) {
    const proposalName = `proposal-${item.slice(10)}`;
    if (
      proposalName === "proposal-dynamic-import" ||
      Object.prototype.hasOwnProperty.call(compatData, proposalName)
    ) {
      item = proposalName;
    }
  }
  // TODO(Babel 8): Remove this. It's needed to keep outputting bugfix/
  // in the debug log.
  if (item.startsWith("bugfix-")) {
    item = `bugfix/transform-${item.slice(7)}`;
  }

  if (!support) {
    console.log(`  ${item}`);
    return;
  }

  let formattedTargets = `{`;
  let first = true;
  for (const target of Object.keys(filteredList) as Target[]) {
    if (!first) formattedTargets += `,`;
    first = false;
    formattedTargets += ` ${target}`;
    if (support[target]) formattedTargets += ` < ${support[target]}`;
  }
  formattedTargets += ` }`;

  console.log(`  ${item} ${formattedTargets}`);
};
