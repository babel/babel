const { versions } = require("electron-to-chromium");
// todo: we should have imported `chromiumVersions` from `require("electron-to-chromium").chromiumVersions`,
// however the data is inconsistent with `require("electron-to-chromium").versions`.
// see https://github.com/Kilian/electron-to-chromium/pull/36
const chromiumVersions = {};
for (const electronVersion of Object.keys(versions)) {
  chromiumVersions[versions[electronVersion]] =
    chromiumVersions[versions[electronVersion]] || electronVersion;
}
const chromiumVersionList = Object.keys(chromiumVersions);

function chromiumToElectron(version) {
  if (chromiumVersions[version]) {
    return chromiumVersions[version];
  }
  const supportedVersion = chromiumVersionList.concat(version);
  supportedVersion.sort((a, b) => +a - +b);
  const nextSupportedVersion =
    supportedVersion[supportedVersion.indexOf(version) + 1];
  return chromiumVersions[nextSupportedVersion];
}

function addElectronSupportFromChromium(supportData) {
  if (supportData.chrome) {
    const electronVersion = chromiumToElectron(supportData.chrome);
    if (electronVersion) {
      supportData.electron = electronVersion;
    }
  }
}

exports.addElectronSupportFromChromium = addElectronSupportFromChromium;
