function relative(loc) {
  return __dirname + "/../" + loc;
}

cp(relative("dist/browser.js"), relative("browser.js"));
cp(relative("dist/browser.min.js"), relative("browser.min.js"));
