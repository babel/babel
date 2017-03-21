export default function getPossiblePresetNames(presetName: string): Array<string> {
  const possibleNames = [`babel-preset-${presetName}`, presetName];

  // trying to resolve @organization shortcat
  // @foo/es2015 -> @foo/babel-preset-es2015
  const matches = presetName.match(/^(@[^/]+)\/(.+)$/);
  if (matches) {
    const [, orgName, presetPath] = matches;
    possibleNames.push(`${orgName}/babel-preset-${presetPath}`);
  }

  return possibleNames;
}
