export default async function (packages) {
  let foundDeps = {};
  let foundDuplicated = false;
  let duplicatedPackages = {};

  function checkDep(name) {
    if (name.indexOf("babel-") === 0 && foundDeps[name]) {
      foundDuplicated = true;
      duplicatedPackages[name] = (duplicatedPackages[name] || 0) + 1;
    }

    foundDeps[name] = true;
  }

  for (let pkg of packages) {
    checkDep(pkg.name);
  }

  if (foundDuplicated) {
    let msg = "Found these duplicate packages:\n\n";

    for (let name in duplicatedPackages) {
      msg += `- ${name} x ${duplicatedPackages[name]}\n`;
    }

    msg += "\nRecommend running `npm dedupe`";
    return [false, msg];
  } else {
    return [true, "No duplicate babel packages found"];
  }
}
