export default function getPossiblePresetNames(presetName: string): Array<string> {
  let possibleNames = [`babel-preset-${presetName}`, presetName];

  // trying to resolve @organization shortcat
  // @foo/es2015 -> @foo/babel-preset-es2015
  let matches = presetName.match(/^(@[^/]+)\/(.+)$/);
  if (matches) {
    let [, orgName, presetPath] = matches;
    possibleNames.push(`${orgName}/babel-preset-${presetPath}`);
  }

  return possibleNames;
}
