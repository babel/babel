function relative(loc) {
  return __dirname + "/../" + loc;
}

cp(relative("dist/browser.js"), relative("browser.js"));
cp(relative("dist/browser.min.js"), relative("browser.min.js"));
cp(relative("dist/polyfill.js"), relative("browser-polyfill.js"));
cp(relative("dist/polyfill.min.js"), relative("browser-polyfill.min.js"));
cp(relative("dist/external-helpers.js"), relative("external-helpers.js"));
cp(relative("dist/external-helpers.min.js"), relative("external-helpers.min.js"));
require("./cache-templates");
