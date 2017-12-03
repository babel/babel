const FS = require('fs');
const Path = require('path');

function packageVersionReplace(text, version) {
  return text.replace(
    /(\n\s*"version"\s*:\s*)"(\d+(?:\.\d+)*)"/,
    '$1"' + version + '"');
}

const replacers = [
  {
    path: '../esdown-runtime/runtime.js',
    findVersion(text) {
      var m = /((?:^|\n)const VERSION = )'(\d+(?:\.\d+)*)'/.exec(text);
      return m && m[2] ? m[2] : '';
    },
    replace(text, version) {
      return text.replace(
        /((?:^|\n)const VERSION = )'(\d+(?:\.\d+)*)'/,
        "$1'" + version + "'");
    },
  },
  {
    path: '../package.json',
    replace: packageVersionReplace,
  },
  {
    path: '../esdown-runtime/package.json',
    replace: packageVersionReplace,
  },
];

var newVersion = '';

if (process.argv.length > 2)
  newVersion = process.argv[2];

replacers.forEach(function(replacer) {
  let path = Path.resolve(__dirname, replacer.path);
  let text = FS.readFileSync(path, { encoding: 'utf8' });

  if (!newVersion) {
    newVersion = replacer.findVersion(text);

    if (!newVersion)
      throw new Error('Version string not found in ' + replacer.path);

    let parts = newVersion.split(/\./);
    let last = Number(parts.pop()) + 1;

    if (isNaN(last))
      throw new Error('Unable to bump version string ' + newVersion);

    parts.push(last + '');

    newVersion = parts.join('.');
  }

  let replaced = replacer.replace(text, newVersion);

  console.log('Updating "' + replacer.path + '" to version "' + newVersion + '"');

  FS.writeFileSync(path, replaced);
});
