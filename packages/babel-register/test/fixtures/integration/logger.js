module.exports = function () {
  return {
    pre() {
      const filename = this.filename
        .replace(__dirname, "<ROOT>")
        .replace(/\\/g, "/");
      console.log(`LOADED: ${JSON.stringify(filename)}`);
    },
  };
};
