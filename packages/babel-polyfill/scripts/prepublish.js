function relative(loc) {
  return __dirname + "/../" + loc;
}

cp(relative("dist/polyfill.min.js"), relative("browser.js"));
