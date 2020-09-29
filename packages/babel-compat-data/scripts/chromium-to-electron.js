const { chromiumVersions } = require("electron-to-chromium");
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
