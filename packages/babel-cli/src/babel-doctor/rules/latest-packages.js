import request from "request";

let cache = {};

function getInfo(packageName) {
  if (cache[packageName]) {
    return cache[packageName];
  } else {
    return cache[packageName] = new Promise(function (resolve, reject) {
      request.get({
        url: `https://registry.npmjs.org/${packageName}/latest`,
        json: true
      }, function (err, res, body) {
        if (err) {
          reject(err);
        } else {
          resolve(cache[packageName] = body);
        }
      });
    });
  }
}

export default async function (packages) {
  let filteredPackages = [];
  let promises = [];

  for (let pkg of (packages: Array)) {
    if (pkg.name.indexOf("babel-") !== 0) continue;

    promises.push(getInfo(pkg.name));
    filteredPackages.push(pkg);
  }

  let infos = await Promise.all(promises);
  let messages = [];

  for (let i = 0; i < infos.length; i++) {
    let info = infos[i];
    let pkg = filteredPackages[i];

    // https://github.com/babel/babel/issues/2915
    if (pkg.name === "babel-runtime") continue;

    if (info.version !== pkg.version) {
      messages.push(`${pkg.name} - Latest is ${info.version}. Local version is ${pkg.version}`);
    }
  }

  if (messages.length) {
    return [false, `We found some outdated packages:\n\n- ${messages.join("\n- ")}`];
  } else {
    return [true, "All babel packages appear to be up to date"];
  }
}
